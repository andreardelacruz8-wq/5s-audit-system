// action-plan.js - WITH OPEN ITEMS COUNTER, CATEGORY COUNTER, AND LOCALSTORAGE PERSISTENCE
// UPDATED: Auto-populate description AND findings count from saved audit data

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, setting up buttons...');
    
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Fill in header data
    const areaAuditedElem = document.getElementById('area-audited');
    if (areaAuditedElem) {
        areaAuditedElem.textContent = params.get('site') || '__________________';
    }
    
    const pointPersonElem = document.getElementById('point-person');
    if (pointPersonElem) {
        pointPersonElem.textContent = params.get('auditor') || '_________________';
    }
    
    const date = params.get('date') || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const auditDateElem = document.getElementById('audit-date');
    if (auditDateElem) {
        auditDateElem.textContent = date;
    }
    
    const footerDateElem = document.getElementById('footer-date');
    if (footerDateElem) {
        footerDateElem.textContent = date;
    }
    
    // LOAD SAVED DATA FROM LOCALSTORAGE
    loadActionPlanData();
    
    // Load audit state to get comments and findings
    loadAuditStateForComments();
    
    // Count open items and update the display
    updateOpenItemsCount();
    
    // Count items by category and update display
    updateCategoryCounts();
    
    // Auto-resize textareas
    document.querySelectorAll('textarea').forEach(function(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
            saveActionPlanData(); // Auto-save on input
        });
    });
    
    // Setup all event listeners
    setupEventListeners();
    
    // Add auto-save to all inputs
    document.querySelectorAll('input, select, textarea').forEach(function(input) {
        input.addEventListener('change', function() {
            saveActionPlanData();
            updateOpenItemsCount(); // Update counts when data changes
            updateCategoryCounts();
        });
        input.addEventListener('blur', function() {
            saveActionPlanData();
        });
    });
    
    // Setup description and findings auto-population for Ref. Criteria selects
    setupAutoPopulation();
    
    // Setup auto-close when target date is entered
    setupAutoCloseOnDate();
    
    console.log('Setup complete');
});

// Handler function for auto-close
function autoCloseHandler(e) {
    const row = this.closest('tr');
    if (row) {
        const statusSelect = row.querySelector('td:nth-child(6) select');
        if (statusSelect && this.value) {
            // If date is filled, set status to 'close' (C)
            statusSelect.value = 'close';
            updateOpenItemsCount();
            saveActionPlanData();
        }
    }
}

// Function to set up auto-close on existing rows
function setupAutoCloseOnDate() {
    // Get all target date inputs (5th column)
    const targetDateInputs = document.querySelectorAll('tbody tr td:nth-child(5) input[type="date"]');
    
    targetDateInputs.forEach(input => {
        // Remove existing listener to avoid duplicates
        input.removeEventListener('change', autoCloseHandler);
        // Add new listener
        input.addEventListener('change', autoCloseHandler);
    });
}

// Function to get quarter number from table title
function getQuarterFromTable(tableContainer) {
    const titleElement = tableContainer.querySelector('p');
    if (!titleElement) return null;
    
    const title = titleElement.textContent.toLowerCase();
    if (title.includes('previous audit')) return 0; // 0 for previous audit
    if (title.includes('first quarter')) return 1;
    if (title.includes('second quarter')) return 2;
    if (title.includes('third quarter')) return 3;
    if (title.includes('fourth quarter')) return 4;
    return null;
}

// Function to load audit state to get comments and findings
function loadAuditStateForComments() {
    try {
        const savedAuditState = localStorage.getItem('5S_auditState');
        if (savedAuditState) {
            window.auditState = JSON.parse(savedAuditState);
            console.log('Audit state loaded for comments and findings');
        } else {
            window.auditState = null;
            console.log('No audit state found');
        }
    } catch (error) {
        console.error('Error loading audit state:', error);
        window.auditState = null;
    }
}

// Function to get findings count for a specific question ID and quarter
function getFindingsFromAudit(questionId, quarter) {
    if (!window.auditState) return '';
    
    // For Previous Audit (quarter = 0), always return empty string - let user input manually
    if (quarter === 0) {
        return '';
    }
    
    // For specific quarters (1-4)
    const quarterData = window.auditState.quarters[quarter];
    if (quarterData && quarterData.findings && quarterData.findings[questionId]) {
        return quarterData.findings[questionId];
    }
    return '';
}

// Function to get comment for a specific question ID and quarter
function getCommentFromAudit(questionId, quarter) {
    if (!window.auditState) return '';
    
    // For Previous Audit (quarter = 0), always return empty string - let user input manually
    if (quarter === 0) {
        return '';
    }
    
    // For specific quarters (1-4)
    const quarterData = window.auditState.quarters[quarter];
    if (quarterData && quarterData.comments && quarterData.comments[questionId]) {
        return quarterData.comments[questionId];
    }
    return '';
}

// Function to setup auto-population of description and findings when Ref. Criteria is selected
function setupAutoPopulation() {
    const allTableContainers = document.querySelectorAll('.table-container');
    
    allTableContainers.forEach(container => {
        const quarter = getQuarterFromTable(container);
        const selects = container.querySelectorAll('select');
        
        selects.forEach(select => {
            // Check if this is a Ref. Criteria select (not status select)
            const hasStatusOptions = Array.from(select.options).some(opt => opt.value === 'open' || opt.value === 'close');
            
            if (!hasStatusOptions) {
                select.addEventListener('change', function() {
                    const selectedValue = this.value;
                    if (selectedValue && quarter !== null) {
                        // Find the row
                        const row = this.closest('tr');
                        if (row) {
                            // Auto-populate description
                            const descriptionTextarea = row.querySelector('td:nth-child(3) textarea');
                            if (descriptionTextarea) {
                                const comment = getCommentFromAudit(selectedValue, quarter);
                                if (comment) {
                                    descriptionTextarea.value = comment;
                                    descriptionTextarea.style.height = 'auto';
                                    descriptionTextarea.style.height = descriptionTextarea.scrollHeight + 'px';
                                } else {
                                    descriptionTextarea.value = '';
                                }
                            }
                            
                            // Auto-populate findings count (4th column)
                            const findingsInput = row.querySelector('td:nth-child(4) input[type="number"]');
                            if (findingsInput) {
                                const findings = getFindingsFromAudit(selectedValue, quarter);
                                if (findings) {
                                    findingsInput.value = findings;
                                } else {
                                    findingsInput.value = '';
                                }
                            }
                            
                            // Save the data
                            saveActionPlanData();
                        }
                    }
                });
            }
        });
    });
}

// Function to save all action plan data to localStorage
function saveActionPlanData() {
    console.log('Saving action plan data...');
    
    const actionPlanData = {
        areaAudited: document.getElementById('area-audited')?.textContent || '',
        pointPerson: document.getElementById('point-person')?.textContent || '',
        auditDate: document.getElementById('audit-date')?.textContent || '',
        tables: []
    };
    
    // Save each table's data
    const tables = document.querySelectorAll('.table-container');
    tables.forEach((container, tableIndex) => {
        const tableData = {
            title: container.querySelector('p')?.textContent || '',
            rows: []
        };
        
        const rows = container.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach(cell => {
                const input = cell.querySelector('input, textarea, select');
                if (input) {
                    if (input.tagName === 'SELECT') {
                        rowData.push({
                            type: 'select',
                            value: input.value,
                            selectedIndex: input.selectedIndex
                        });
                    } else if (input.type === 'date') {
                        rowData.push({
                            type: 'date',
                            value: input.value
                        });
                    } else if (input.tagName === 'TEXTAREA') {
                        rowData.push({
                            type: 'textarea',
                            value: input.value
                        });
                    } else {
                        rowData.push({
                            type: 'input',
                            value: input.value,
                            inputType: input.type
                        });
                    }
                } else {
                    rowData.push({
                        type: 'text',
                        value: cell.textContent.trim()
                    });
                }
            });
            tableData.rows.push(rowData);
        });
        
        actionPlanData.tables.push(tableData);
    });
    
    // Save to localStorage with a unique key based on site and date
    const site = actionPlanData.areaAudited || 'default';
    const date = actionPlanData.auditDate || new Date().toISOString();
    const storageKey = `actionPlan_${site}_${date}`;
    
    localStorage.setItem('currentActionPlan', JSON.stringify(actionPlanData));
    localStorage.setItem(storageKey, JSON.stringify(actionPlanData));
    
    console.log('Action plan data saved');
}

// Function to load action plan data from localStorage
function loadActionPlanData() {
    console.log('Loading action plan data...');
    
    // Try to load the current action plan
    const savedData = localStorage.getItem('currentActionPlan');
    if (!savedData) {
        console.log('No saved action plan data found');
        return;
    }
    
    try {
        const actionPlanData = JSON.parse(savedData);
        
        // Restore header data if it's not already set from URL params
        const params = new URLSearchParams(window.location.search);
        if (!params.get('site')) {
            const areaAuditedElem = document.getElementById('area-audited');
            if (areaAuditedElem) {
                areaAuditedElem.textContent = actionPlanData.areaAudited || '__________________';
            }
        }
        
        if (!params.get('auditor')) {
            const pointPersonElem = document.getElementById('point-person');
            if (pointPersonElem) {
                pointPersonElem.textContent = actionPlanData.pointPerson || '_________________';
            }
        }
        
        if (!params.get('date')) {
            const auditDateElem = document.getElementById('audit-date');
            if (auditDateElem && actionPlanData.auditDate) {
                auditDateElem.textContent = actionPlanData.auditDate;
            }
            
            const footerDateElem = document.getElementById('footer-date');
            if (footerDateElem && actionPlanData.auditDate) {
                footerDateElem.textContent = actionPlanData.auditDate;
            }
        }
        
        // Restore table data
        const tables = document.querySelectorAll('.table-container');
        
        tables.forEach((container, tableIndex) => {
            if (actionPlanData.tables && actionPlanData.tables[tableIndex]) {
                const tableData = actionPlanData.tables[tableIndex];
                const rows = container.querySelectorAll('tbody tr');
                
                rows.forEach((row, rowIndex) => {
                    if (tableData.rows && tableData.rows[rowIndex]) {
                        const rowData = tableData.rows[rowIndex];
                        const cells = row.querySelectorAll('td');
                        
                        cells.forEach((cell, cellIndex) => {
                            if (rowData[cellIndex]) {
                                const cellData = rowData[cellIndex];
                                const input = cell.querySelector('input, textarea, select');
                                
                                if (input) {
                                    if (cellData.type === 'select') {
                                        input.value = cellData.value;
                                    } else if (cellData.type === 'date' || cellData.type === 'input' || cellData.type === 'textarea') {
                                        input.value = cellData.value;
                                    }
                                }
                            }
                        });
                    }
                });
            }
        });
        
        console.log('Action plan data loaded successfully');
        
        // Setup auto-population and auto-close after loading data
        setTimeout(setupAutoPopulation, 100);
        setTimeout(setupAutoCloseOnDate, 100);
        
    } catch (error) {
        console.error('Error loading action plan data:', error);
    }
}

// Function to count all open items (O) in status columns
function countOpenItems() {
    let openCount = 0;
    
    // Get all tables
    const tables = document.querySelectorAll('.table-container table');
    
    tables.forEach(table => {
        // Get all rows in tbody
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            // Get the status cell (6th column, index 5)
            const statusCell = row.querySelector('td:nth-child(6)');
            if (statusCell) {
                // Check for select dropdown
                const select = statusCell.querySelector('select');
                if (select) {
                    const selectedValue = select.value;
                    const selectedText = select.options[select.selectedIndex]?.textContent;
                    
                    // Count if O is selected (either by value or text)
                    if (selectedValue === 'open' || selectedText === 'O') {
                        openCount++;
                    }
                }
                
                // Check for input field
                const input = statusCell.querySelector('input');
                if (input && input.value) {
                    if (input.value.toUpperCase() === 'O') {
                        openCount++;
                    }
                }
                
                // Check for plain text
                const text = statusCell.textContent.trim();
                if (text === 'O' || text === 'Open') {
                    openCount++;
                }
            }
        });
    });
    
    return openCount;
}

// Function to count the SUM of findings by category based on Ref. Criteria column (2nd column) and Findings column (4th column)
function countItemsByCategory() {
    // Initialize counters for each category (for sum of findings)
    const counts = {
        'Sort': 0,
        'Systematize': 0,
        'Sweep': 0,
        'Standardize': 0,
        'Self-Discipline': 0
    };
    
    // Get all tables
    const tables = document.querySelectorAll('.table-container table');
    
    tables.forEach(table => {
        // Get all rows in tbody
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            // Get the Ref. Criteria cell (2nd column, index 1)
            const refCell = row.querySelector('td:nth-child(2)');
            // Get the Findings cell (4th column, index 3)
            const findingsCell = row.querySelector('td:nth-child(4)');
            
            if (refCell) {
                let refValue = '';
                
                // Check for select dropdown
                const select = refCell.querySelector('select');
                if (select) {
                    refValue = select.value;
                } else {
                    // Check for input field
                    const input = refCell.querySelector('input');
                    if (input) {
                        refValue = input.value;
                    } else {
                        // Check for plain text
                        refValue = refCell.textContent.trim();
                    }
                }
                
                // Get findings value
                let findingsValue = 0;
                if (findingsCell) {
                    const findingsInput = findingsCell.querySelector('input[type="number"]');
                    if (findingsInput && findingsInput.value) {
                        findingsValue = parseInt(findingsInput.value) || 0;
                    } else {
                        const findingsText = findingsCell.textContent.trim();
                        if (findingsText && !isNaN(parseInt(findingsText))) {
                            findingsValue = parseInt(findingsText) || 0;
                        }
                    }
                }
                
                // Determine category based on the prefix (q1., q2., q3., q4., q5.) and add findings value
                if (refValue) {
                    if (refValue.startsWith('q1.') || refValue.startsWith('S1.')) {
                        counts['Sort'] += findingsValue;
                    } else if (refValue.startsWith('q2.') || refValue.startsWith('S2.')) {
                        counts['Systematize'] += findingsValue;
                    } else if (refValue.startsWith('q3.') || refValue.startsWith('S3.')) {
                        counts['Sweep'] += findingsValue;
                    } else if (refValue.startsWith('q4.') || refValue.startsWith('S4.')) {
                        counts['Standardize'] += findingsValue;
                    } else if (refValue.startsWith('q5.') || refValue.startsWith('S5.')) {
                        counts['Self-Discipline'] += findingsValue;
                    }
                }
            }
        });
    });
    
    return counts;
}

// Function to update the category counts display (now shows sum of findings)
function updateCategoryCounts() {
    const counts = countItemsByCategory();
    
    // Update each category count in the display
    const sortSpan = document.getElementById('sort-count');
    const systSpan = document.getElementById('systematize-count');
    const sweepSpan = document.getElementById('sweep-count');
    const standSpan = document.getElementById('standardize-count');
    const discSpan = document.getElementById('discipline-count');
    
    if (sortSpan) {
        sortSpan.textContent = counts['Sort'];
    }
    if (systSpan) {
        systSpan.textContent = counts['Systematize'];
    }
    if (sweepSpan) {
        sweepSpan.textContent = counts['Sweep'];
    }
    if (standSpan) {
        standSpan.textContent = counts['Standardize'];
    }
    if (discSpan) {
        discSpan.textContent = counts['Self-Discipline'];
    }
    
    console.log('Category findings sums updated:', counts);
    return counts;
}

// Function to update the open items display
function updateOpenItemsCount() {
    const openCount = countOpenItems();
    const openActionsSpan = document.getElementById('open-actions');
    
    if (openActionsSpan) {
        // Clear existing content
        openActionsSpan.innerHTML = '';
        
        // Create bold element with the count
        const bold = document.createElement('b');
        bold.textContent = openCount;
        openActionsSpan.appendChild(bold);
    }
    
    // Also update category counts when open items are updated
    updateCategoryCounts();
    
    console.log('Open items count updated:', openCount);
    return openCount;
}

// Helper function to generate the Ref Criteria dropdown options with q1., q2. format
function getRefCriteriaOptions() {
    return `
        <option value=""></option>
        <option value="q1.1">Sort 1</option>
        <option value="q1.2">Sort 2</option>
        <option value="q1.3">Sort 3</option>
        <option value="q1.4">Sort 4</option>
        <option value="q1.5">Sort 5</option>
        <option value="q1.6">Sort 6</option>
        <option value="q1.7">Sort 7</option>
        <option value="q1.8">Sort 8</option>
        <option value="q1.9">Sort 9</option>
        <option value="q1.10">Sort 10</option>
        <option value="q1.11">Sort 11</option>
        <option value="q1.12">Sort 12</option>
        <option value="q2.1">Systematize 1</option>
        <option value="q2.2">Systematize 2</option>
        <option value="q2.3">Systematize 3</option>
        <option value="q2.4">Systematize 4</option>
        <option value="q2.5">Systematize 5</option>
        <option value="q2.6">Systematize 6</option>
        <option value="q2.7">Systematize 7</option>
        <option value="q2.8">Systematize 8</option>
        <option value="q2.9">Systematize 9</option>
        <option value="q2.10">Systematize 10</option>
        <option value="q2.11">Systematize 11</option>
        <option value="q2.12">Systematize 12</option>
        <option value="q2.13">Systematize 13</option>
        <option value="q3.1">Sweep 1</option>
        <option value="q3.2">Sweep 2</option>
        <option value="q3.3">Sweep 3</option>
        <option value="q3.4">Sweep 4</option>
        <option value="q3.5">Sweep 5</option>
        <option value="q3.6">Sweep 6</option>
        <option value="q3.7">Sweep 7</option>
        <option value="q3.8">Sweep 8</option>
        <option value="q3.9">Sweep 9</option>
        <option value="q3.10">Sweep 10</option>
        <option value="q4.1">Standardize 1</option>
        <option value="q4.2">Standardize 2</option>
        <option value="q4.3">Standardize 3</option>
        <option value="q4.4">Standardize 4</option>
        <option value="q4.5">Standardize 5</option>
        <option value="q4.6">Standardize 6</option>
        <option value="q4.7">Standardize 7</option>
        <option value="q5.1">Self-discipline 1</option>
        <option value="q5.2">Self-discipline 2</option>
        <option value="q5.3">Self-discipline 3</option>
        <option value="q5.4">Self-discipline 4</option>
        <option value="q5.5">Self-discipline 5</option>
        <option value="q5.6">Self-discipline 6</option>
        <option value="q5.7">Self-discipline 7</option>
        <option value="q5.8">Self-discipline 8</option>
        <option value="q5.9">Self-discipline 9</option>
        <option value="q5.10">Self-discipline 10</option>
        <option value="q5.11">Self-discipline 11</option>
        <option value="q5.12">Self-discipline 12</option>
    `;
}

function setupEventListeners() {
    // Save button
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveActionPlanAsExcel();
        });
    }
    
    // Close button
    const closeBtn = document.getElementById('close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeWindow();
        });
    }
    
    // Add Row buttons
    const addButtons = document.querySelectorAll('.add-row-btn');
    addButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addNewRowToTable(this);
            saveActionPlanData(); // Auto-save after adding row
            // Re-setup auto-population for new selects
            setTimeout(setupAutoPopulation, 100);
            // Re-setup auto-close for new rows
            setTimeout(setupAutoCloseOnDate, 100);
        });
    });
    
    // Listen for changes to status selects/inputs to update count and auto-save
    document.addEventListener('change', function(e) {
        if (e.target.matches('select') || e.target.matches('input') || e.target.matches('textarea')) {
            // Check if this is a status field (6th column)
            const cell = e.target.closest('td');
            if (cell) {
                const tdIndex = Array.from(cell.parentNode.children).indexOf(cell);
                if (tdIndex === 5) { // 6th column (0-based index 5) - Status column
                    updateOpenItemsCount();
                }
                // Check if this is a Ref. Criteria field (2nd column)
                if (tdIndex === 1) { // 2nd column (0-based index 1)
                    updateCategoryCounts();
                }
            }
            saveActionPlanData(); // Auto-save on change
        }
    });
    
    // Also listen for input events for text inputs
    document.addEventListener('input', function(e) {
        if (e.target.matches('input') || e.target.matches('textarea')) {
            const cell = e.target.closest('td');
            if (cell) {
                const tdIndex = Array.from(cell.parentNode.children).indexOf(cell);
                if (tdIndex === 5) { // 6th column (0-based index 5) - Status column
                    updateOpenItemsCount();
                }
                if (tdIndex === 1) { // 2nd column (0-based index 1) - Ref Criteria
                    updateCategoryCounts();
                }
            }
            saveActionPlanData(); // Auto-save on input
        }
    });
}

// Add new row function - UPDATED with auto-populate for description and findings
function addNewRowToTable(button) {
    console.log('Adding new row...');
    
    const container = button.closest('.table-container');
    if (!container) {
        alert('Error: Table container not found');
        return;
    }
    
    const quarter = getQuarterFromTable(container);
    const table = container.querySelector('table');
    if (!table) {
        alert('Error: Table not found');
        return;
    }
    
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }
    
    const newRow = tbody.insertRow();
    
    // Create all 7 cells
    const cells = [];
    for (let i = 0; i < 7; i++) {
        cells.push(newRow.insertCell());
    }
    
    // 1. Date of Audit
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.className = 'input-field';
    dateInput.addEventListener('change', function() {
        saveActionPlanData();
    });
    dateInput.addEventListener('blur', saveActionPlanData);
    cells[0].appendChild(dateInput);
    
    // 2. Ref. Criteria - DROPDOWN SELECT with auto-population
    const refCriteriaSelect = document.createElement('select');
    refCriteriaSelect.className = 'input-field';
    refCriteriaSelect.innerHTML = getRefCriteriaOptions();
    refCriteriaSelect.addEventListener('change', function() {
        updateCategoryCounts();
        
        const selectedValue = this.value;
        if (selectedValue && quarter !== null) {
            const row = this.closest('tr');
            if (row) {
                // Auto-populate description (3rd column)
                const descriptionTextarea = row.querySelector('td:nth-child(3) textarea');
                if (descriptionTextarea) {
                    const comment = getCommentFromAudit(selectedValue, quarter);
                    descriptionTextarea.value = comment || '';
                    descriptionTextarea.style.height = 'auto';
                    descriptionTextarea.style.height = descriptionTextarea.scrollHeight + 'px';
                }
                
                // Auto-populate findings count (4th column)
                const findingsInput = row.querySelector('td:nth-child(4) input[type="number"]');
                if (findingsInput) {
                    const findings = getFindingsFromAudit(selectedValue, quarter);
                    findingsInput.value = findings || '';
                }
            }
        }
        saveActionPlanData();
    });
    refCriteriaSelect.addEventListener('blur', saveActionPlanData);
    cells[1].appendChild(refCriteriaSelect);
    
    // 3. Description
    const textarea1 = document.createElement('textarea');
    textarea1.className = 'input-field';
    textarea1.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
        saveActionPlanData();
    });
    textarea1.addEventListener('blur', saveActionPlanData);
    cells[2].appendChild(textarea1);
    
    // 4. No. of Findings
    const numberInput1 = document.createElement('input');
    numberInput1.type = 'number';
    numberInput1.min = '0';
    numberInput1.className = 'input-field';
    numberInput1.addEventListener('input', saveActionPlanData);
    numberInput1.addEventListener('blur', saveActionPlanData);
    cells[3].appendChild(numberInput1);
    
    // 5. Date (Target Date) - with auto-close functionality
    const targetDateInput = document.createElement('input');
    targetDateInput.type = 'date';
    targetDateInput.className = 'input-field';
    targetDateInput.addEventListener('change', function() {
        const row = this.closest('tr');
        if (row) {
            const statusSelect = row.querySelector('td:nth-child(6) select');
            if (statusSelect && this.value) {
                statusSelect.value = 'close';
                updateOpenItemsCount();
                saveActionPlanData();
            }
        }
        saveActionPlanData();
    });
    targetDateInput.addEventListener('blur', saveActionPlanData);
    cells[4].appendChild(targetDateInput);
    
    // 6. Status - SELECT dropdown
    const statusSelect = document.createElement('select');
    statusSelect.className = 'input-field';
    
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = '';
    statusSelect.appendChild(emptyOption);
    
    const openOption = document.createElement('option');
    openOption.value = 'open';
    openOption.textContent = 'O';
    statusSelect.appendChild(openOption);
    
    const closeOption = document.createElement('option');
    closeOption.value = 'close';
    closeOption.textContent = 'C';
    statusSelect.appendChild(closeOption);
    
    statusSelect.addEventListener('change', function() {
        updateOpenItemsCount();
        saveActionPlanData();
    });
    cells[5].appendChild(statusSelect);
    
    // 7. For Action - SELECT dropdown with Maintenance Unit and Auditee
    const forActionSelect = document.createElement('select');
    forActionSelect.className = 'input-field';
    
    const forActionEmptyOption = document.createElement('option');
    forActionEmptyOption.value = '';
    forActionEmptyOption.textContent = '';
    forActionSelect.appendChild(forActionEmptyOption);
    
    const maOption = document.createElement('option');
    maOption.value = 'ma';
    maOption.textContent = 'Maintenance Unit';
    forActionSelect.appendChild(maOption);
    
    const auOption = document.createElement('option');
    auOption.value = 'au';
    auOption.textContent = 'Auditee';
    forActionSelect.appendChild(auOption);
    
    forActionSelect.addEventListener('change', function() {
        saveActionPlanData();
    });
    cells[6].appendChild(forActionSelect);
    
    // Add auto-resize to new textareas
    newRow.querySelectorAll('textarea').forEach(function(textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Update counts after adding new row
    updateOpenItemsCount();
    updateCategoryCounts();
    
    // Save data
    saveActionPlanData();
    
    // Setup auto-population and auto-close for the new row
    setTimeout(setupAutoPopulation, 100);
    setTimeout(setupAutoCloseOnDate, 100);
}

// Save to Excel function - with updated open items count and category findings sums
function saveActionPlanAsExcel() {
    console.log('Save button clicked');
    
    // Update counts one last time before saving
    const openCount = updateOpenItemsCount();
    const categoryCounts = updateCategoryCounts();
    
    if (typeof XLSX === 'undefined') {
        alert('Excel library not loaded. Please check your internet connection and refresh the page.');
        return;
    }
    
    try {
        // Get the actual HTML content and create an Excel file that looks like it
        const htmlContent = generateHTMLExcelFormat(openCount, categoryCounts);
        
        // Save as .xls file (HTML format that Excel can open with styling)
        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `Office_5S_Action_Plan_${dateStr}.xls`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Action plan saved successfully!');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving file: ' + error.message);
    }
}

// Generate HTML format that Excel will render with proper styling
function generateHTMLExcelFormat(openCount, categoryCounts) {
    // Get data
    const areaAudited = document.getElementById('area-audited')?.textContent || '__________________';
    const pointPerson = document.getElementById('point-person')?.textContent || '_________________';
    const auditDate = document.getElementById('audit-date')?.textContent || '';
    
    // Start building HTML
    let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
        <meta charset="UTF-8">
        <title>Office 5S Action Plan</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #1E3A5F; font-size: 24px; text-align: center; margin-bottom: 20px; }
            .header-info { margin-bottom: 15px; }
            .header-info p { margin: 5px 0; }
            
            .status-categories { 
                background-color: #f0f0f0; 
                padding: 10px; 
                margin: 15px 0; 
                border-radius: 5px; 
                border: none !important;
            }
            
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; border: 2px solid #4472C4; }
            th { background-color: #4472C4; color: white; font-weight: bold; padding: 8px; border: 1px solid #2F5597; text-align: center; }
            td { border: 1px solid #CCCCCC; padding: 6px; vertical-align: top; }
            .table-title { font-weight: bold; font-size: 14px; margin: 15px 0 5px 0; color: #1E3A5F; }
            
            .footer { 
                margin-top: 30px; 
                font-size: 11px; 
                color: #666; 
                text-align: center; 
                border: none !important; 
                border-top: none !important; 
                padding-top: 10px; 
            }
            .open-actions { font-weight: bold; color: #1E3A5F; }
            .category-text { font-size: 11px; color: #333; }
            
            .signature-section {
                margin-top: 100px;
                margin-bottom: 50px;
                width: 50%;
                margin-left: auto;
                margin-right: auto;
                text-align: center;
                border: none;
            }
            .signature-label {
                font-weight: bold;
                font-size: 14px;
                color: #000000;
                margin-bottom: 5px;
                text-align: center;
            }
            .signature-line {
                font-family: 'Courier New', monospace;
                font-size: 20px;
                letter-spacing: 2px;
                color: #000000;
                margin: 5px 0;
            }
            .signature-role {
                font-weight: bold;
                font-size: 14px;
                color: #000000;
                text-align: center;
                margin-top: 5px;
            }
            .spacer {
                height: 30px;
                width: 100%;
            }
            
            *:not(table):not(th):not(td) {
                border: none !important;
                border-top: none !important;
                border-bottom: none !important;
                border-left: none !important;
                border-right: none !important;
                outline: none !important;
            }
            
            hr {
                display: none !important;
            }
        </style>
    </head>
    <body>
        <h1>OFFICE 5S ACTION PLAN</h1>
        
        <div class="header-info">
            <p><strong>Area Audited:</strong> ${areaAudited}</p>
            <p><strong>5S Point Person:</strong> ${pointPerson}</p>
            <p><strong>Date:</strong> ${auditDate}</p>
        </div>
        
        <div>
            <p class="open-actions">There are <strong>${openCount}</strong> open action items.</p>
        </div>
        
        <div>
            <p class="open-actions">There are <strong>${categoryCounts?.Sort || 0}</strong> Sort findings, <strong>${categoryCounts?.Systematize || 0}</strong> Systematize findings, <strong>${categoryCounts?.Sweep || 0}</strong> Sweep findings, <strong>${categoryCounts?.Standardize || 0}</strong> Standardize findings, <strong>${categoryCounts?.['Self-Discipline'] || 0}</strong> Self-Discipline findings.</p>
        </div>
        
        <div class="status-categories">
            <p class="category-text"><strong>Status:</strong> O - Open | C - Closed</p>
            <p class="category-text"><strong>Categories:</strong> S1 - Sort, S2 - Systematize, S3 - Sweep, S4 - Standardize, S5 - Self-Discipline</p>
        </div>
    `;
    
    // Get all table containers
    const tables = document.querySelectorAll('.table-container');
    
    tables.forEach((container, tableIndex) => {
        const titleElem = container.querySelector('p');
        const title = titleElem ? titleElem.textContent : 'Table';
        html += `<div class="table-title">${title.toUpperCase()}</div>`;
        
        const table = container.querySelector('table');
        if (table) {
            html += `<table>`;
            
            // Add headers
            html += `<thead><tr>`;
            table.querySelectorAll('thead th').forEach(th => {
                html += `<th>${th.textContent.trim()}</th>`;
            });
            html += `</tr></thead>`;
            
            // Add body
            html += `<tbody>`;
            
            table.querySelectorAll('tbody tr').forEach(row => {
                html += `<tr>`;
                row.querySelectorAll('td').forEach(cell => {
                    const input = cell.querySelector('input, textarea, select');
                    if (input) {
                        let value = '';
                        if (input.tagName === 'SELECT') {
                            const selectedOption = input.options[input.selectedIndex];
                            value = selectedOption ? selectedOption.textContent : '';
                        } else if (input.type === 'date' && input.value) {
                            const dateObj = new Date(input.value);
                            const day = dateObj.getDate().toString().padStart(2, '0');
                            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                            const year = dateObj.getFullYear();
                            value = `${day}/${month}/${year}`;
                        } else {
                            value = input.value;
                        }
                        html += `<td>${value || ''}</td>`;
                    } else {
                        html += `<td>${cell.textContent.trim()}</td>`;
                    }
                });
                html += `</tr>`;
            });
            
            html += `</tbody></table>`;
            
            if (tableIndex < tables.length - 1) {
                html += `<br><br>`;
            }
        }
    });
    
    // ADD SPACERS
    html += `<div class="spacer"></div><div class="spacer"></div><div class="spacer"></div><br><br><br>`;
    
    // ADD SIGNATURE SECTION
    html += `
        <div class="signature-section">
            <div class="signature-label">Acknowledged by:</div>
            <div class="signature-line">______________________________________</div>
            <div class="signature-role">5S Point Person</div>
        </div>
    `;
    
    html += `<div class="spacer"></div><br>`;
    
    html += `
        <div class="footer" style="border: none; border-top: none;">
            <p><strong>Office 5S Action Plan</strong> - Fill in the items above to track your 5S improvement activities</p>
            <p>Generated on: ${auditDate}</p>
        </div>
    </body>
    </html>
    `;
    
    return html;
}

// Close window function
function closeWindow() {
    if (confirm('Are you sure you want to close this window?')) {
        window.close();
    }
}

// Make functions globally available
window.saveActionPlanAsExcel = saveActionPlanAsExcel;
window.closeWindow = closeWindow;