// js/app.js

// State Management
// State Management
// State Management
const auditState = {
    currentQuarter: 1,
    auditor: '',
    site: '',
    year: new Date().getFullYear(),
    auditDate: new Date().toISOString().split('T')[0], // Add this line - stores YYYY-MM-DD
    quarters: {
        1: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null },
        2: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null },
        3: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null },
        4: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null }
    },
    lastSaved: null
};

// 5S Questions Data
const questionsData = [
    {
        id: 'Sort',
        title: 'Sort - Distinguish between what is needed and not needed.',
        icon: 'fas fa-filter',
        color: '#e74c3c',
        subcategories: [
            {
                title: 'Office Space',
                questions: [
                    { id: 'q1.1', title: '1', text: 'Aisles, stairways, corners etc. are free from obstruction.', maxScore: 4 },
                    { id: 'q1.2', title: '2', text: 'All tripping hazards such as electrical wires, equipment cables, etc. are removed from all working, standing, and walking areas.', maxScore: 4 },
                    { id: 'q1.3', title: '3', text: 'Wires or cables are neatly bundled and organized.', maxScore: 4 },
                    { id: 'q1.4', title: '4', text: 'Items/supplies have been sorted, separating needed from unneeded, stacked when not in use, removing unnecessary piles on surface.', maxScore: 4 },
                    { id: 'q1.5', title: '5', text: 'Critical items are protected from damages such as floods, water leakages, etc.', maxScore: 4 },
                    { id: 'q1.6', title: '6', text: 'Only the required paperworks/equipment/items are present in the work area. Outdated memos, orders, documents, signages, etc. are removed or properly disposed.', maxScore: 4 },
                    { id: 'q1.7', title: '7', text: 'Unneeded items/equipment have been removed from the work area.', maxScore: 4 }
                ]
            },
            {
                title: 'Tables/Desk',
                questions: [
                    { id: 'q1.8', title: '8', text: 'Items on top do not occupy more than 50% of the working space.', maxScore: 4 },
                    { id: 'q1.9', title: '9', text: 'No unnecessary items and only a maximum of 3 personal effects are found on top.', maxScore: 4 }
                ]
            },
            {
                title: 'Shelves, Cabinets, Other Storage Areas',
                questions: [
                    { id: 'q1.10', title: '10', text: 'Items/supplies have been sorted, separating needed from unneeded.', maxScore: 4 }
                ]
            },
            {
                title: 'Color-coded Tags',
                questions: [
                    { id: 'q1.11', title: '11', text: 'Unneeded/unnecessary items have been marked with color-coded tags.', maxScore: 4 },
                    { id: 'q1.12', title: '12', text: 'Color-coding system is properly implemented and understood by all staff.', maxScore: 4 }
                ]
            }
        ]
    },
    {
        id: 'Systematize',
        title: 'A place for everything and everything in its space.',
        icon: 'fas fa-th-large',
        color: '#3498db',
        subcategories: [
            {
                title: 'Office Space',
                questions: [
                    { id: 'q2.1', title: '1',text: 'Aisleways, workstations, and equipment location are identified.', maxScore: 4 },
                    { id: 'q2.2', title: '2', text: 'Hazardous items are kept away from items preventing contamination.', maxScore: 4 },
                    { id: 'q2.3', title: '3', text: 'Labels indicate the contents or drawers, shelves, cabinets, file boxes, etc (a new person should be able to locate without assistance). Labelling allows immediate identification.', maxScore: 4 },
                    { id: 'q2.4', title: '4', text: 'Shared drawers, cabinets, work surfaces, and storage areas are clearly labeled and well organized.', maxScore: 4 },
                ]
            },
            {
                title: 'Movable Items',
                questions: [
                    { id: 'q2.5', title: '5', text: 'Items are clearly labeled and placed in their proper locations. Items include heavy equipment, repair tools, white boards, and other movable items prone to clutter except appliances.', maxScore: 4 },
                ]
            },
            {
                title: 'Office Laptop/PC',
                questions: [
                    { id: 'q2.6', title: '6', text: 'Use of standard desktop wallpaper.', maxScore: 4},
                    { id: 'q2.7', title: '7', text: 'Screen icons/files are neatly organized.', maxScore: 4 }
                ]
            },
            {
                title: 'Storage Area, Archives Room, Supply Room',
                questions: [
                    { id: 'q2.8', title: '8', text: 'Level Stock Indicator or Checklist/Inventory or Supplies are available and updated (either soft copy or printed).', maxScore: 4},
                    { id: 'q2.9', title: '9', text: 'Supplies, unneeded items and outdated documents are labeled and properly stored.', maxScore: 4}
                ]
            },
            {
                title: 'Safety',
                questions: [
                    { id: 'q2.10', title: '10', text: 'Safety equipment are properly labeled and in good condition. These include PPE, fire alarm, fire extinguisher, emergency lights, first aid kits, etc.', maxScore: 4},
                    { id: 'q2.11', title: '11', text: 'Fire hoses, fire extinguishers, and other emergency equipment are prominently displayed and are unobstructed.', maxScore: 4},
                    { id: 'q2.12', title: '12', text: 'Electrical systems such as switches, circuit breakers, etc. are clearly labeled and protected.', maxScore: 4},
                    { id: 'q2.13', title: '13', text: 'Waste bins are properly labeled, covered (except for paper waste bins) and placed in there proper locations.', maxScore: 4}
                ]
            }
        ]
    },
    {
        id: 'Sweep',
        title: 'Routine discipline maintaining a clean and organized workplace',
        icon: 'fas fa-broom',
        color: '#2ecc71',
        subcategories: [
            {
                title: 'Housekeeping and Cleaning Responsibilities',
                questions: [
                    { id: 'q3.1', title: '1', text: 'Equipment, computers, work surfaces, and storage areas are cleaned, sanitized and maintained.', maxScore: 4 },
                    { id: 'q3.2', title: '2', text: 'Common areas are cleaned, sanitized and maintained.', maxScore: 4 },
                    { id: 'q3.3', title: '3', text: 'Work stations are neat, cleaned, sanitized and organized.', maxScore: 4 },
                    { id: 'q3.4', title: '4', text: 'Cleaning schedule is in place and implemented by assigned Maintenance staff.', maxScore: 4 },
                    { id: 'q3.5', title: '5', text: 'Cleaning checklist for restroom is available and updated.', maxScore: 4 },
                    { id: 'q3.6', title: '6', text: 'Waste are collected and disposed of correctly.', maxScore: 4 },
                ]
            },
            {
                title: 'Building Structure and Other',
                questions: [
                    { id: 'q3.7', title: '7', text: 'Walls, ceilings, floors and other structures are cleaned and in good condition.', maxScore: 4},
                    { id: 'q3.8', title: '8', text: 'Furnitures and fixtures are cleaned and in good condition.', maxScore: 4},
                    { id: 'q3.9', title: '9', text: 'Equipment, lightings, outlets, fire extinguishers, emergency lights, etc. were inspected and are in good condition.', maxScore: 4},
                    { id: 'q3.10', title: '10', text: 'Items for repair or damaged were reported to the assigned Safety and Maintenance Officer using the Maintenance checklist form.', maxScore: 4}

                ]
            }
        ]
    },
    {
        id: 'Standardize',
        title: 'Preventing the area from having abnormal operating conditions',
        icon: 'fas fa-clipboard-list',
        color: '#9b59b6',
        subcategories: [
            {
                title: 'Housekeeping and Cleaning Responsibilities',
                questions: [
                    { id: 'q4.1', title: '1', text: 'The work environment is well-lighted and well-ventilated.', maxScore: 4},
                    { id: 'q4.2', title: '2', text: 'All signages, labels, warnings etc. are cleaned, easy to read, not torn or damaged and provide adequate protection.', maxScore: 4},
                    { id: 'q4.3', title: '3', text: 'Appropriate visual displays and controls are posted. Citizen\'s Charter, Emergency Hotlines, Office Directory, Emergency Exit Plans, Locator Chart, Energy Conservation signages and labels are available.', maxScore: 4},
                    { id: 'q4.4', title: '4', text: 'The 5S Quality Work Standards and results of the previous audit are clearly displayed or on file and readily accessible.', maxScore: 4},
                    { id: 'q4.5', title: '5', text: 'Specific cleaning and organizing tasks have been developed and assigned per work area.', maxScore: 4},
                    { id: 'q4.6', title: '6', text: 'All staff are trained and fully understand the 5S procedures.', maxScore: 4},
                    { id: 'q4.7', title: '7', text: 'Maintenance records are updated regularly. Equipment maintenance records are accessible and clearly state when the last maintenance was conducted.', maxScore: 4}
                ]
            }
        ]
    },
    {
        id: 'Self-Discipline',
        title: 'Stick to the rules',
        icon: 'fas fa-trophy',
        color: '#f39c12',
        subcategories: [
            {
                title: 'Self-Discipline',
                questions: [
                    { id: 'q5.1', title: '1', text: 'Proper sorting of necessary and unnecessary items are in place (S1). Average score in S1 Category vs. Equivalent Table.', maxScore: 4},
                    { id: 'q5.2', title: '2', text: 'Standardized use of labels, signs & colors to identify normal/abnormal conditions (S2). Average score in S2 Category vs. Equivalent Table.', maxScore: 4},
                    { id: 'q5.3', title: '3', text: 'Standardized cleaning, sanitizing, and work procedures are followed (S3). Average score in S3 Category vs. Equivalent Table.', maxScore: 4},
                    { id: 'q5.4', title: '4', text: 'People, Environment and Visual Management are in place (S4). Average score in S4 Category vs. Equivalent Table.', maxScore: 4},
                    { id: 'q5.5', title: '5', text: 'The CSC and DOST prescribed dress code and wearing of the office ID at all times are followed.', maxScore: 4},
                    { id: 'q5.6', title: '6', text: 'All staff are involved in the improvement activities and know their responsibilities in maintaining 5S in their work areas.', maxScore: 4},
                    { id: 'q5.7', title: '7', text: 'S5 Open Action Items for S1 Category are acted upon.', maxScore: 4},
                    { id: 'q5.8', title: '8', text: 'S5 Open Action Items for S2 Category are acted upon.', maxScore: 4},
                    { id: 'q5.9', title: '9', text: 'S5 Open Action Items for S3 Category are acted upon.', maxScore: 4},
                    { id: 'q5.10', title: '10', text: 'S5 Open Action Items for S4 Category are acted upon.', maxScore: 4},
                    { id: 'q5.11', title: '11', text: '5S and Office documentation and instructions are current.', maxScore: 4},
                    { id: 'q5.12', title: '12', text: 'Time and resources are allocated to 5S activities (e.g. designed daily/weekly clean-up time, mock audit, 5S Unit Team).', maxScore: 4}
                ]
            }
        ]
    }
];

// DOM Elements
const quarterContent = document.getElementById('quarterContent');
const quarterTabs = document.querySelectorAll('.quarter-tab');
const currentQuarterIndicator = document.getElementById('currentQuarterIndicator');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApplication();
    loadQuarterContent(1);
    setupEventListeners();
});

// Initialize Application
// Initialize Application
function initializeApplication() {
    // Load saved data from localStorage
    loadAuditState();
    
    // Update auditor and year inputs
    const auditorInput = document.getElementById('auditorName');
    const yearInput = document.getElementById('auditYear');
    const siteInput = document.getElementById('department');
    const dateInput = document.getElementById('auditDate');
    
    if (auditorInput) {
        auditorInput.value = auditState.auditor;
        auditorInput.addEventListener('change', function() {
            auditState.auditor = this.value;
            saveAuditState();
        });
    }
    
    if (yearInput) {
        yearInput.value = auditState.year;
        yearInput.addEventListener('change', function() {
            auditState.year = parseInt(this.value);
            saveAuditState();
        });
    }
    
    // Add site input handling
    if (siteInput) {
        siteInput.value = auditState.site || '';
        siteInput.addEventListener('change', function() {
            auditState.site = this.value;
            saveAuditState();
            console.log('Site updated:', auditState.site);
        });
    }
    
    // Add date input handling
    if (dateInput) {
        dateInput.value = auditState.auditDate || new Date().toISOString().split('T')[0];
        dateInput.addEventListener('change', function() {
            auditState.auditDate = this.value;
            // Also update year from date if needed
            if (this.value) {
                const selectedYear = parseInt(this.value.split('-')[0]);
                if (!isNaN(selectedYear)) {
                    auditState.year = selectedYear;
                    if (yearInput) yearInput.value = selectedYear;
                }
            }
            saveAuditState();
            console.log('Date updated:', auditState.auditDate);
        });
    }
    
    // Initialize sheet summary
    updateSheetSummary();
    
    // NEW: Update annual average colors
    setTimeout(updateAnnualAverageColors, 100);

    setTimeout(updateMaturityTable, 200)
}


// Setup Event Listeners
function setupEventListeners() {
    // Quarter tab switching
    quarterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const quarter = parseInt(this.dataset.quarter);
            switchQuarter(quarter);
        });
    });
}

// Switch Quarter
function switchQuarter(quarter) {
    auditState.currentQuarter = quarter;
    
    // Update active tab
    quarterTabs.forEach(tab => {
        if (parseInt(tab.dataset.quarter) === quarter) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update indicator
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    currentQuarterIndicator.querySelector('span').textContent = `${quarterNames[quarter-1]} Quarter`;
    
    // Load content
    loadQuarterContent(quarter);
    
    // Save state
    saveAuditState();
}

// Load Quarter Content
function loadQuarterContent(quarter) {
    quarterContent.innerHTML = '';
    
    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'questionnaire-container';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'quarter-header';
    header.innerHTML = `
        <h2><i class="fas fa-calendar-check"></i> ${getQuarterName(quarter)} Audit</h2>
        <div class="quarter-stats">
            <div class="stat-item">
                <span class="stat-label">Questions:</span>
                <span class="stat-value" id="totalQuestions">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Answered:</span>
                <span class="stat-value" id="answeredQuestions">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Score:</span>
                <span class="stat-value" id="currentScore">0.00</span>
            </div>
        </div>
    `;
    mainContainer.appendChild(header);
    
    // Create questions container
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';
    
    // Add questions for each category
    questionsData.forEach((category, categoryIndex) => {
        const categoryCard = createCategoryCard(category, quarter);
        questionsContainer.appendChild(categoryCard);
    });
    
    mainContainer.appendChild(questionsContainer);
    quarterContent.appendChild(mainContainer);
    
    // Update stats
    updateQuarterStats(quarter);
}

// Create Category Card
function createCategoryCard(category, quarter) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.category = category.id;
    
    // Calculate category score
    const categoryScore = calculateCategoryScore(category.id, quarter);
    const maxScore = getCategoryMaxScore(category.id);
    const percentage = maxScore > 0 ? (categoryScore / maxScore * 100).toFixed(1) : 0;
    
    card.innerHTML = `
        <div class="category-header">
            <div class="category-title">
                <i class="${category.icon}"></i>
                <div>
                    <h3>${category.id}</h3>
                    <p>${category.title}</p>
                </div>
            </div>
            <div class="category-score">
                <span class="score-value">${categoryScore.toFixed(2)}</span>
                <span class="score-max">/ ${maxScore}</span>
                <div class="score-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        </div>
        <div class="category-content">
            ${category.subcategories.map((subcat, subcatIndex) => createSubcategorySection(category, subcat, quarter)).join('')}
        </div>
    `;
    
    // Apply the category color to the left border of the card
    setTimeout(() => {
        card.style.borderLeft = `5px solid ${category.color}`;
        
        // Also apply color to other elements
        const icon = card.querySelector('.category-title i');
        const title = card.querySelector('.category-title h3');
        const progressBar = card.querySelector('.progress-bar');
        
        if (icon) icon.style.color = category.color;
        if (title) title.style.color = category.color;
        if (progressBar) progressBar.style.background = category.color;
    }, 0);
    
    return card;
}

// Add this helper function
function applyCategoryColorsToCard(card, category) {
    const header = card.querySelector('.category-header');
    const icon = card.querySelector('.category-title i');
    const title = card.querySelector('.category-title h3');
    const progressBar = card.querySelector('.progress-bar');
    
    if (header) {
        header.style.borderLeftColor = category.color;
        header.style.borderLeftWidth = '5px';
        header.style.borderLeftStyle = 'solid';
    }
    
    if (icon) {
        icon.style.color = category.color;
    }
    
    if (title) {
        title.style.color = category.color;
    }
    
    if (progressBar) {
        progressBar.style.background = category.color;
    }
}

// Create Subcategory Section
function createSubcategorySection(category, subcategory, quarter) {
    return `
        <div class="subcategory-section">
            <h4 class="subcategory-title">${subcategory.title}</h4>
            <div class="questions-list">
                ${subcategory.questions.map((question, qIndex) => createQuestionRow(category.id, question, quarter)).join('')}
            </div>
        </div>
    `;
}

// Create Question Row - MODIFIED: Use input box for findings count with save/load
function createQuestionRow(categoryId, question, quarter) {
    // Safely get current score and comment
    let currentScore = 0;
    let currentComment = '';
    let currentFindings = '';
    
    if (auditState && auditState.quarters && auditState.quarters[quarter]) {
        currentScore = auditState.quarters[quarter].scores[question.id] || 0;
        currentComment = auditState.quarters[quarter].comments[question.id] || '';
        // Get saved findings count if it exists
        currentFindings = auditState.quarters[quarter].findings?.[question.id] || '';
    }
    
    // Find the category to get its color
    const category = questionsData.find(cat => cat.id === categoryId);
    const categoryColor = category ? category.color : '#3498db';
    
    // If no saved findings, try to derive from score
    if (!currentFindings && currentScore > 0) {
        if (currentScore === 4) currentFindings = '0';
        else if (currentScore === 3) currentFindings = '';
        else if (currentScore === 2) currentFindings = '';
        else if (currentScore === 1) currentFindings = '';
        else if (currentScore === 0) currentFindings = '';
    }
    
    // Check if there are photos for this question
    let hasPhotos = false;
    if (auditState && auditState.quarters[quarter] && auditState.quarters[quarter].photos) {
        hasPhotos = auditState.quarters[quarter].photos.some(photo => photo.questionId === question.id);
    }
    
    return `
        <div class="question-row" data-question-id="${question.id}" data-category-color="${categoryColor}">
            <div class="question-text">
                <span class="question-number">${question.title}</span>
                <span class="question-content">${question.text}</span>
            </div>
            <div class="question-controls">
                <div class="findings-input">
                    <label class="findings-label">No. of Findings:</label>
                    <input type="number" 
                           class="findings-field" 
                           data-question-id="${question.id}"
                           data-quarter="${quarter}"
                           value="${currentFindings}"
                           placeholder="0-10+"
                           min="0"
                           step="1"
                           onchange="updateScoreFromFindings('${question.id}', ${quarter}, this.value)">
                </div>
                <div class="score-display">
                    <span class="score-label">Score:</span>
                    <span class="current-score" id="score-${question.id}-${quarter}">${currentScore}</span>
                    <span class="max-score">/ ${question.maxScore}</span>
                </div>
                <div class="question-action-buttons">
                    <div class="comment-section">
                        <button class="action-btn comment-btn ${currentComment ? 'has-comment' : ''}" 
                                onclick="toggleComment('${question.id}', ${quarter})"
                                title="${currentComment ? 'Edit comment' : 'Add comment'}">
                            <i class="fas fa-comment${currentComment ? '-dots' : ''}"></i>
                        </button>
                        <div class="comment-popup" id="comment-${question.id}-${quarter}" style="display: none;">
                            <textarea placeholder="Add comments or observations..." 
                                      onblur="saveComment('${question.id}', ${quarter}, this.value)">${currentComment}</textarea>
                        </div>
                    </div>
                    <div class="upload-section">
                        <button class="action-btn upload-btn ${hasPhotos ? 'has-photos' : ''}" 
                                onclick="uploadPhoto('${question.id}', ${quarter})"
                                title="${hasPhotos ? 'View/Change photo' : 'Upload photo'}">
                            <i class="fas fa-camera${hasPhotos ? '' : ''}"></i>
                        </button>
                        <input type="file" 
                               id="photo-input-${question.id}-${quarter}" 
                               accept="image/*" 
                               style="display: none;"
                               onchange="handlePhotoUpload('${question.id}', ${quarter}, this)">
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to convert findings count to score based on conditions
function findingsToScore(findings) {
    const numFindings = parseInt(findings);
    
    if (isNaN(numFindings)) return null;
    if (numFindings < 0) return null;
    
    // Conditions:
    // 0 findings = Score 4
    // 1-3 findings = Score 3
    // 4-6 findings = Score 2
    // 7-9 findings = Score 1
    // 10+ findings = Score 0
    
    if (numFindings === 0) return 4;
    if (numFindings >= 1 && numFindings <= 3) return 3;
    if (numFindings >= 4 && numFindings <= 6) return 2;
    if (numFindings >= 7 && numFindings <= 9) return 1;
    if (numFindings >= 10) return 0;
    
    return null;
}

// Function to update score from findings input
function updateScoreFromFindings(questionId, quarter, findingsValue) {
    console.log('updateScoreFromFindings called:', questionId, quarter, findingsValue);
    
    // Allow empty value to clear
    if (findingsValue === '' || findingsValue === null) {
        // Clear the score and findings
        setQuestionScore(questionId, 0, quarter, '');
        // Update the input field to show empty
        const inputField = document.querySelector(`.findings-field[data-question-id="${questionId}"][data-quarter="${quarter}"]`);
        if (inputField) inputField.value = '';
        // Update score display
        const scoreDisplay = document.getElementById(`score-${questionId}-${quarter}`);
        if (scoreDisplay) scoreDisplay.textContent = '0';
        return;
    }
    
    const score = findingsToScore(findingsValue);
    
    if (score !== null) {
        // Save both the score and the findings value
        setQuestionScore(questionId, score, quarter, findingsValue);
        
        // Update the score display
        const scoreDisplay = document.getElementById(`score-${questionId}-${quarter}`);
        if (scoreDisplay) scoreDisplay.textContent = score;
        
        // Keep the entered value in the field
        const inputField = document.querySelector(`.findings-field[data-question-id="${questionId}"][data-quarter="${quarter}"]`);
        if (inputField) {
            inputField.value = findingsValue;
        }
    } else {
        // Invalid input, show error and revert
        alert('Please enter a valid number (0 or positive integer)');
        const inputField = document.querySelector(`.findings-field[data-question-id="${questionId}"][data-quarter="${quarter}"]`);
        if (inputField) {
            // Reset to previous value from saved findings
            const savedFindings = auditState.quarters[quarter].findings?.[questionId] || '';
            inputField.value = savedFindings;
        }
    }
}

// Set Question Score - MODIFIED to also save findings
function setQuestionScore(questionId, score, quarter, findingsValue = null) {
    auditState.quarters[quarter].scores[questionId] = score;
    
    // Save findings if provided
    if (findingsValue !== null) {
        if (!auditState.quarters[quarter].findings) {
            auditState.quarters[quarter].findings = {};
        }
        auditState.quarters[quarter].findings[questionId] = findingsValue;
    }
    
    // Mark that this score was explicitly set
    if (!auditState.quarters[quarter].scoreSet) {
        auditState.quarters[quarter].scoreSet = {};
    }
    auditState.quarters[quarter].scoreSet[questionId] = true;
    
    // Update the last updated timestamp for this quarter
    auditState.quarters[quarter].lastUpdated = new Date().toISOString();
    
    // Update UI
    const questionRow = document.querySelector(`.question-row[data-question-id="${questionId}"]`);
    if (questionRow) {
        // Update score display
        const scoreDisplay = questionRow.querySelector('.current-score');
        if (scoreDisplay) {
            scoreDisplay.textContent = score;
        }
    }
    
    // Update category score
    const categoryId = questionId.split('.')[0].replace('q', '');
    updateCategoryScore(categoryId, quarter);
    
    // Update stats
    updateQuarterStats(quarter);
    
    // Update sheet summary
    updateSheetSummary();
    
    // Save state
    saveAuditState();
    
    console.log(`Score set: Q${quarter}, ${questionId} = ${score}, findings: ${findingsValue}`);
}

// Function to trigger photo upload
function uploadPhoto(questionId, quarter) {
    const hasPhotos = auditState.quarters[quarter].photos && 
                      auditState.quarters[quarter].photos.some(photo => photo.questionId === questionId);
    
    if (hasPhotos) {
        // If photo exists, show it
        viewPhoto(questionId, quarter);
    } else {
        // If no photo, trigger upload
        const inputId = `photo-input-${questionId}-${quarter}`;
        const fileInput = document.getElementById(inputId);
        
        if (fileInput) {
            fileInput.click();
        }
    }
}

// Function to handle the uploaded photo
function handlePhotoUpload(questionId, quarter, inputElement) {
    if (!inputElement.files || inputElement.files.length === 0) {
        return;
    }
    
    const file = inputElement.files[0];
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please choose an image under 5MB.');
        inputElement.value = '';
        return;
    }
    
    // Check file type
    if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.).');
        inputElement.value = '';
        return;
    }
    
    // Create a preview and store the photo
    const reader = new FileReader();
    reader.onload = function(e) {
        // Store photo in audit state
        if (!auditState.quarters[quarter].photos) {
            auditState.quarters[quarter].photos = [];
        }
        
        // Remove existing photo for this question if any
        auditState.quarters[quarter].photos = auditState.quarters[quarter].photos.filter(
            photo => photo.questionId !== questionId
        );
        
        // Add new photo
        auditState.quarters[quarter].photos.push({
            questionId: questionId,
            fileName: file.name,
            fileType: file.type,
            dataUrl: e.target.result,
            uploadedAt: new Date().toISOString()
        });
        
        // Save state
        saveAuditState();
        
        // Update UI to show photo indicator
        updatePhotoButton(questionId, quarter);
        
        // Show success message
        showStatusMessage(`Photo uploaded for question ${questionId}`, 'success');
    };
    
    reader.readAsDataURL(file);
}

// Function to update photo button appearance
function updatePhotoButton(questionId, quarter) {
    const uploadBtn = document.querySelector(`.upload-btn[onclick*="${questionId}"]`);
    if (uploadBtn) {
        uploadBtn.classList.add('has-photos');
        uploadBtn.innerHTML = '<i class="fas fa-camera"></i>';
        uploadBtn.title = 'View/Change photo';
    }
}

// Function to view uploaded photo
function viewPhoto(questionId, quarter) {
    const photos = auditState.quarters[quarter].photos || [];
    const photo = photos.find(p => p.questionId === questionId);
    
    if (!photo) {
        alert('No photo found for this question.');
        return;
    }
    
    // Create a modal to view the photo
    const modalHtml = `
        <div class="photo-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        ">
            <div style="
                background: white;
                padding: 20px;
                border-radius: 10px;
                max-width: 90%;
                max-height: 90%;
                overflow: auto;
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                ">
                    <h3>Photo for ${questionId}</h3>
                    <button onclick="closePhotoModal()" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #666;
                    ">&times;</button>
                </div>
                <img src="${photo.dataUrl}" alt="${photo.fileName}" style="
                    max-width: 100%;
                    max-height: 70vh;
                    display: block;
                    margin: 0 auto;
                ">
                <div style="
                    margin-top: 15px;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                ">
                    <p>${photo.fileName}</p>
                    <p>Uploaded: ${new Date(photo.uploadedAt).toLocaleString()}</p>
                    <button onclick="removePhoto('${questionId}', ${quarter})" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-top: 10px;
                    ">
                        <i class="fas fa-trash"></i> Remove Photo
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.id = 'photoViewModal';
    document.body.appendChild(modal);
}

// Function to close photo modal
function closePhotoModal() {
    const modal = document.getElementById('photoViewModal');
    if (modal) {
        modal.remove();
    }
}

// Function to remove photo
function removePhoto(questionId, quarter) {
    if (confirm('Are you sure you want to remove this photo?')) {
        auditState.quarters[quarter].photos = auditState.quarters[quarter].photos.filter(
            photo => photo.questionId !== questionId
        );
        
        saveAuditState();
        updatePhotoButton(questionId, quarter);
        closePhotoModal();
        showStatusMessage('Photo removed', 'info');
    }
}

// Toggle Comment
function toggleComment(questionId, quarter) {
    const commentPopup = document.getElementById(`comment-${questionId}-${quarter}`);
    if (commentPopup) {
        commentPopup.style.display = commentPopup.style.display === 'none' ? 'block' : 'none';
        if (commentPopup.style.display === 'block') {
            commentPopup.querySelector('textarea').focus();
        }
    }
}

// Save Comment
function saveComment(questionId, quarter, comment) {
    auditState.quarters[quarter].comments[questionId] = comment.trim();
    
    // Update comment button
    const commentBtn = document.querySelector(`.comment-btn[onclick*="${questionId}"]`);
    if (commentBtn) {
        commentBtn.classList.toggle('has-comment', comment.trim().length > 0);
        commentBtn.innerHTML = `<i class="fas fa-comment${comment.trim().length > 0 ? '-dots' : ''}"></i>`;
    }
    
    saveAuditState();
}

// Update Category Score
function updateCategoryScore(categoryId, quarter) {
    const category = questionsData.find(cat => cat.id === categoryId);
    if (!category) return;
    
    const score = calculateCategoryScore(categoryId, quarter);
    const maxScore = getCategoryMaxScore(categoryId);
    const percentage = maxScore > 0 ? (score / maxScore * 100).toFixed(1) : 0;
    
    const categoryCard = document.querySelector(`.category-card[data-category="${categoryId}"]`);
    if (categoryCard) {
        const scoreValue = categoryCard.querySelector('.score-value');
        const progressBar = categoryCard.querySelector('.progress-bar');
        
        if (scoreValue) scoreValue.textContent = score.toFixed(2);
        if (progressBar) progressBar.style.width = `${percentage}%`;
    }
}

// Calculate Category Score
function calculateCategoryScore(categoryId, quarter) {
    const category = questionsData.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    let totalScore = 0;
    let questionCount = 0;
    
    category.subcategories.forEach(subcat => {
        subcat.questions.forEach(question => {
            const score = auditState.quarters[quarter].scores[question.id] || 0;
            totalScore += score;
            questionCount++;
        });
    });
    
    return questionCount > 0 ? totalScore / questionCount : 0;
}

// Get Category Max Score
function getCategoryMaxScore(categoryId) {
    const category = questionsData.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    let totalMax = 0;
    category.subcategories.forEach(subcat => {
        subcat.questions.forEach(question => {
            totalMax += question.maxScore;
        });
    });
    
    // Return average max score (since we're averaging individual question scores)
    const questionCount = category.subcategories.reduce((count, subcat) => count + subcat.questions.length, 0);
    return questionCount > 0 ? totalMax / questionCount : 0;
}

// Update Quarter Stats
function updateQuarterStats(quarter) {
    const totalQuestions = document.getElementById('totalQuestions');
    const answeredQuestions = document.getElementById('answeredQuestions');
    const currentScore = document.getElementById('currentScore');
    
    if (!totalQuestions || !answeredQuestions || !currentScore) return;
    
    // Count total questions
    let totalCount = 0;
    let answeredCount = 0;
    let totalScore = 0;
    
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            subcat.questions.forEach(question => {
                totalCount++;
                const score = auditState.quarters[quarter].scores[question.id] || 0;
                if (score > 0) answeredCount++;
                totalScore += score;
            });
        });
    });
    
    totalQuestions.textContent = totalCount;
    answeredQuestions.textContent = answeredCount;
    currentScore.textContent = (totalCount > 0 ? totalScore / totalCount : 0).toFixed(2);
}

// Get Quarter Name
function getQuarterName(quarter) {
    const names = ['First', 'Second', 'Third', 'Fourth'];
    return names[quarter - 1] || 'Unknown';
}

// Add this function after updateCompletionPercentage()
function applyCategoryColorsToSummary() {
    questionsData.forEach((category) => {
        const catName = category.id.toLowerCase().replace('self-', '');
        
        // Get all cells in the category row
        const rowCells = document.querySelectorAll(`#${catName}-q1, #${catName}-q2, #${catName}-q3, #${catName}-q4, #${catName}-avg`);
        
        rowCells.forEach(cell => {
            cell.style.color = category.color;
            cell.style.fontWeight = 'bold';
        });
        
        // Also color the category name icon
        const categoryCell = document.querySelector(`.category-name i[class*="${category.icon.split(' ')[1]}"]`);
        if (categoryCell) {
            categoryCell.style.color = category.color;
        }
    });
}

// Update Annual Average Colors
function updateAnnualAverageColors() {
    // Get all annual average elements
    const annualAverages = document.querySelectorAll('.annual-average');
    
    annualAverages.forEach(element => {
        // Get the numeric value
        const value = parseFloat(element.textContent) || 0;
        
        // Remove existing level classes
        element.classList.remove(
            'score-level1', 
            'score-level2', 
            'score-level3', 
            'score-level4', 
            'score-level5'
        );
        
        // Apply appropriate class based on value ranges
        if (value >= 0 && value <= 0.80) {
            element.classList.add('score-level1'); // Red
        } else if (value >= 0.81 && value <= 1.60) {
            element.classList.add('score-level2'); // Yellow
        } else if (value >= 1.61 && value <= 2.40) {
            element.classList.add('score-level3'); // Orange
        } else if (value >= 2.41 && value <= 3.20) {
            element.classList.add('score-level4'); // Green
        } else if (value >= 3.21 && value <= 4.00) {
            element.classList.add('score-level5'); // Blue
        }
    });
}

// Update Sheet Summary
// Update Sheet Summary
function updateSheetSummary() {
    // Update quarter statuses
    for (let q = 1; q <= 4; q++) {
        const statusElement = document.getElementById(`q${q}-status`);
        if (statusElement) {
            const answeredCount = Object.keys(auditState.quarters[q].scores).length;
            const totalCount = getTotalQuestionsCount();
            const percentage = (answeredCount / totalCount * 100).toFixed(0);
            
            if (answeredCount === 0) {
                statusElement.textContent = 'Not Started';
                statusElement.className = 'quarter-status not-started';
            } else if (answeredCount === totalCount) {
                statusElement.textContent = 'Completed';
                statusElement.className = 'quarter-status completed';
            } else {
                statusElement.textContent = `In Progress (${percentage}%)`;
                statusElement.className = 'quarter-status in-progress';
            }
        }
    }
    
    // Update category scores
    questionsData.forEach((category, index) => {
        const catName = category.id.toLowerCase().replace('self-', '');
        for (let q = 1; q <= 4; q++) {
            const score = calculateCategoryScore(category.id, q);
            const element = document.getElementById(`${catName}-q${q}`);
            if (element) {
                element.textContent = score.toFixed(2);
            }
        }
        
        // Update averages
        const avgElement = document.getElementById(`${catName}-avg`);
        if (avgElement) {
            let total = 0;
            let count = 0;
            for (let q = 1; q <= 4; q++) {
                const score = calculateCategoryScore(category.id, q);
                total += score;
                if (score > 0) count++;
            }
            const avg = count > 0 ? total / count : 0;
            avgElement.textContent = avg.toFixed(2);
        }
    });
    
    // Update totals
    for (let q = 1; q <= 4; q++) {
        const totalElement = document.getElementById(`total-q${q}`);
        if (totalElement) {
            let totalScore = 0;
            let questionCount = 0;
            
            questionsData.forEach(category => {
                category.subcategories.forEach(subcat => {
                    subcat.questions.forEach(question => {
                        const score = auditState.quarters[q].scores[question.id] || 0;
                        totalScore += score;
                        questionCount++;
                    });
                });
            });
            
            const avg = questionCount > 0 ? totalScore / questionCount : 0;
            totalElement.textContent = avg.toFixed(2);
        }
    }
    
    // Update overall average
    const totalAvgElement = document.getElementById('total-avg');
    if (totalAvgElement) {
        let totalAll = 0;
        let countAll = 0;
        
        for (let q = 1; q <= 4; q++) {
            let quarterTotal = 0;
            let quarterCount = 0;
            
            questionsData.forEach(category => {
                category.subcategories.forEach(subcat => {
                    subcat.questions.forEach(question => {
                        const score = auditState.quarters[q].scores[question.id] || 0;
                        quarterTotal += score;
                        quarterCount++;
                    });
                });
            });
            
            if (quarterCount > 0) {
                totalAll += quarterTotal / quarterCount;
                countAll++;
            }
        }
        
        const overallAvg = countAll > 0 ? totalAll / countAll : 0;
        totalAvgElement.textContent = overallAvg.toFixed(2);
    }
    
    // Update completion percentage
    updateCompletionPercentage();
    
    // NEW: Update annual average colors
    updateAnnualAverageColors();

    updateMaturityTable();
}
//start 02-10 morning
function updateCompletionPercentage() {
    let totalQuestions = 0;
    let completedQuestions = 0;
    let totalScore = 0; // Add this
    let maxPossibleScore = 0; // Add this
    
    for (let q = 1; q <= 4; q++) {
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    totalQuestions++;
                    const score = auditState.quarters[q].scores[question.id] || 0;
                    maxPossibleScore += question.maxScore; // Usually 4
                    totalScore += score;
                    
                    if (score > 0) {
                        completedQuestions++;
                    }
                });
            });
        });
    }
    
    const completionPercentage = totalQuestions > 0 ? (completedQuestions / totalQuestions * 100) : 0;
    const scorePercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore * 100) : 0;
    
    const percentageElement = document.getElementById('completion-percentage');
    const fillElement = document.getElementById('completion-fill');
    const annualRatingElement = document.getElementById('annual-rating');
    
    if (percentageElement) {
        percentageElement.textContent = `${completionPercentage.toFixed(0)}% Complete`;
    }
    
    if (fillElement) {
        fillElement.style.width = `${completionPercentage}%`;
    }
    
    if (annualRatingElement) {
        // Use scorePercentage instead of completionPercentage for rating
        annualRatingElement.textContent = getAnnualRating(scorePercentage);
    }
}

function getAnnualRating(scorePercentage) {
    if (scorePercentage >= 80.25) return "Level 5";
    if (scorePercentage >= 60.25) return "Level 4";
    if (scorePercentage >= 40.25) return "Level 3";
    if (scorePercentage >= 20.25) return "Level 2";
    if (scorePercentage >= 0) return "Level 1";
    return "❌ Invalid";
}
//end 02-10 morning

// Get Total Questions Count
function getTotalQuestionsCount() {
    let count = 0;
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            count += subcat.questions.length;
        });
    });
    return count;
}

// Save Audit State to localStorage
function saveAuditState() {
    localStorage.setItem('5S_auditState', JSON.stringify(auditState));
    auditState.lastSaved = new Date().toISOString();
}

// In loadAuditState function, add findings initialization
function loadAuditState() {
    const saved = localStorage.getItem('5S_auditState');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(auditState, parsed);
        
        // Ensure site property exists
        if (!auditState.site) {
            auditState.site = '';
        }
        
        // Ensure auditDate property exists
        if (!auditState.auditDate) {
            const dateInput = document.getElementById('auditDate');
            if (dateInput && dateInput.value) {
                auditState.auditDate = dateInput.value;
            } else {
                auditState.auditDate = new Date().toISOString().split('T')[0];
            }
        }
        
        // Ensure all quarter structures exist
        for (let i = 1; i <= 4; i++) {
            if (!auditState.quarters[i]) {
                auditState.quarters[i] = { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} };
            }
            if (!auditState.quarters[i].scoreSet) {
                auditState.quarters[i].scoreSet = {};
            }
            if (!auditState.quarters[i].lastUpdated) {
                auditState.quarters[i].lastUpdated = null;
            }
            if (!auditState.quarters[i].findings) {
                auditState.quarters[i].findings = {};
            }
            
            // For any existing scores that aren't marked in scoreSet, mark them as set
            Object.keys(auditState.quarters[i].scores || {}).forEach(questionId => {
                const score = auditState.quarters[i].scores[questionId];
                if (score !== undefined && !auditState.quarters[i].scoreSet[questionId]) {
                    auditState.quarters[i].scoreSet[questionId] = true;
                }
            });
        }
    } else {
        // Initialize with scoreSet and findings objects for new audits
        for (let i = 1; i <= 4; i++) {
            auditState.quarters[i] = { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} };
        }
        auditState.site = '';
        
        // Set auditDate from input or today
        const dateInput = document.getElementById('auditDate');
        if (dateInput && dateInput.value) {
            auditState.auditDate = dateInput.value;
        } else {
            auditState.auditDate = new Date().toISOString().split('T')[0];
        }
    }
    
    console.log('Loaded auditState:', auditState);
}

// Save Current Quarter
function saveCurrentQuarter() {
    console.log('saveCurrentQuarter function called');
    
    try {
        const quarter = auditState.currentQuarter;
        const quarterName = getQuarterName(quarter);
        
        // Get the actual date
        const auditDate = auditState.auditDate || new Date().toISOString().split('T')[0];
        const formattedDate = new Date(auditDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Check if XLSX library is loaded
        if (typeof XLSX === 'undefined' || typeof XLSX.utils === 'undefined') {
            console.warn('XLSX library not available, using CSV');
            exportToCSV(quarter);
            return;
        }
        
        // Create workbook
        const workbook = XLSX.utils.book_new();
        
        // Prepare data with actual date - REMOVED year line
        const excelData = [
            ['5S GOOD HOUSEKEEPING PROGRAM SCORESHEET'],
            [`${quarterName} Quarter Audit Report`],
            [],
            ['Auditor:', auditState.auditor || 'Not Specified'],
            ['Audit Site:', auditState.site || 'Not Specified'],
            ['Audit Date:', formattedDate],
            ['Report Generated:', new Date().toLocaleString()],
            [],
            ['Category', 'Sub Category', 'Question #', 'Question', 'Score', 'Comments']
        ];
        
        // Track current category to avoid repetition
        let lastCategory = '';
        let lastSubcategory = '';
        
        // Add each question with its comment - MODIFIED: Use question.title
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    const score = auditState.quarters[quarter].scores[question.id] || 0;
                    const comment = auditState.quarters[quarter].comments[question.id] || '';
                    
                    // Only show category if it's different from last
                    const categoryDisplay = (category.id !== lastCategory) ? category.id : '';
                    lastCategory = category.id;
                    
                    // Only show subcategory if it's different from last within the same category
                    const subcatDisplay = (subcat.title !== lastSubcategory) ? subcat.title : '';
                    lastSubcategory = subcat.title;
                    
                    excelData.push([
                        categoryDisplay,
                        subcatDisplay,
                        question.title,
                        question.text,
                        score,
                        comment
                    ]);
                });
            });
            // Reset subcategory when category changes
            lastSubcategory = '';
        });
        
        // Add summary
        excelData.push([]);
        excelData.push(['CATEGORY SUMMARY']);
        excelData.push(['Category', 'Average Score', 'Rating']);
        
        questionsData.forEach(category => {
            const score = calculateCategoryScore(category.id, quarter);
            excelData.push([category.id, score.toFixed(2), getScoreRating(score)]);
        });
        
        // Add total average
        let totalQuestions = 0;
        let totalScore = 0;
        
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    totalQuestions++;
                    totalScore += auditState.quarters[quarter].scores[question.id] || 0;
                });
            });
        });
        
        const averageScore = totalQuestions > 0 ? (totalScore / totalQuestions).toFixed(2) : '0.00';
        excelData.push([]);
        excelData.push(['TOTAL AVERAGE SCORE', `${averageScore}/4.00`, getScoreRating(parseFloat(averageScore))]);
        
        // Add last updated info
        if (auditState.quarters[quarter].lastUpdated) {
            const lastUpdated = new Date(auditState.quarters[quarter].lastUpdated).toLocaleString();
            excelData.push([]);
            excelData.push(['Last Updated:', lastUpdated]);
        }
        
        // Create sheet
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        
        // Set column widths - updated for new structure
        worksheet['!cols'] = [
            { wch: 15 }, // Category
            { wch: 20 }, // Sub Category
            { wch: 10 }, // Question #
            { wch: 60 }, // Question
            { wch: 8 },  // Score
            { wch: 40 }  // Comments
        ];
        
        XLSX.utils.book_append_sheet(workbook, worksheet, "5S Audit");
        
        // Save file with date in filename
        const dateStr = auditDate.replace(/-/g, '');
        const siteSuffix = auditState.site ? `_${auditState.site.replace(/\s+/g, '_')}` : '';
        const filename = `5S_Audit_Q${quarter}_${auditState.year}_${dateStr}${siteSuffix}.xlsx`;
        XLSX.writeFile(workbook, filename);
        
        showStatusMessage(`${quarterName} Quarter saved to Excel with date!`, 'success');
        
    } catch (error) {
        console.error('Error in saveCurrentQuarter:', error);
        exportToCSV(auditState.currentQuarter);
    }
}

// Show Photo Evidence
// Show Photo Evidence
function showPhotoEvidence() {
    console.log('showPhotoEvidence called');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'photo-modal-lg';
    modal.id = 'photoEvidenceModal';
    
    // Collect all photos from all quarters
    const photoData = [];
    let totalPhotos = 0;
    
    for (let q = 1; q <= 4; q++) {
        const quarterPhotos = auditState.quarters[q].photos || [];
        totalPhotos += quarterPhotos.length;
        
        quarterPhotos.forEach(photo => {
            // Find the question details
            let questionDetails = null;
            let categoryInfo = null;
            
            for (const category of questionsData) {
                for (const subcat of category.subcategories) {
                    const question = subcat.questions.find(q => q.id === photo.questionId);
                    if (question) {
                        questionDetails = question;
                        categoryInfo = {
                            category: category,
                            subcategory: subcat
                        };
                        break;
                    }
                }
                if (questionDetails) break;
            }
            
            if (questionDetails && categoryInfo) {
                photoData.push({
                    quarter: q,
                    category: categoryInfo.category,
                    subcategory: categoryInfo.subcategory,
                    question: questionDetails,
                    photo: photo
                });
            }
        });
    }
    
    // Group by category for display
    const groupedByCategory = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!groupedByCategory[catId]) {
            groupedByCategory[catId] = {
                category: item.category,
                items: []
            };
        }
        groupedByCategory[catId].items.push(item);
    });
    
    // Build modal content
    let tableRows = '';
    let lastCategory = '';
    let lastSubcategory = '';
    
    if (photoData.length === 0) {
        // No photos found
        tableRows = `
            <tr>
                <td colspan="7" class="no-photos-message">
                    <i class="fas fa-images"></i>
                    <h3>No Photo Evidence Found</h3>
                    <p>Upload photos by clicking the camera icon next to each question.</p>
                </td>
            </tr>
        `;
    } else {
        // Sort by category and question
        photoData.sort((a, b) => {
            if (a.category.id !== b.category.id) return a.category.id.localeCompare(b.category.id);
            if (a.subcategory.title !== b.subcategory.title) return a.subcategory.title.localeCompare(b.subcategory.title);
            return a.question.id.localeCompare(b.question.id);
        });
        
        photoData.forEach(item => {
            // Use category ID instead of title
            const categoryDisplay = (item.category.id !== lastCategory) ? 
                `<div style="color: ${item.category.color}; font-weight: bold;">${item.category.id}</div>` : '';
            lastCategory = item.category.id;
            
            const subcategoryDisplay = (item.subcategory.title !== lastSubcategory) ? 
                `<em>${item.subcategory.title}</em>` : '';
            lastSubcategory = item.subcategory.title;
            
            const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
            
            tableRows += `
                <tr>
                    <td>${categoryDisplay}</td>
                    <td>${subcategoryDisplay}</td>
                    <td>${item.question.title}</td>
                    <td>${item.question.text.substring(0, 60)}${item.question.text.length > 60 ? '...' : ''}</td>
                    <td><span class="quarter-badge">${quarterNames[item.quarter-1]}</span></td>
                    <td>
                        <img src="${item.photo.dataUrl}" 
                             class="photo-thumbnail" 
                             onclick="viewFullPhoto('${item.photo.dataUrl}', '${item.question.id}', ${item.quarter})"
                             title="Click to enlarge">
                    </td>
                    <td>
                        <button onclick="deletePhoto('${item.question.id}', ${item.quarter})" 
                                class="btn-small btn-danger"
                                title="Delete photo">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
    
    modal.innerHTML = `
        <div class="photo-modal-content">
            <div class="photo-modal-header">
                <h2>
                    <i class="fas fa-images"></i> 
                    Photo Evidence Gallery
                    <span class="photo-counter">
                        <i class="fas fa-camera"></i> ${totalPhotos} Photo${totalPhotos !== 1 ? 's' : ''}
                    </span>
                </h2>
                <button class="photo-modal-close" onclick="closePhotoEvidence()">&times;</button>
            </div>
            <div class="photo-modal-body">
                <div style="margin-bottom: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                    <button class="btn-export-photos" onclick="exportPhotoList()">
                        <i class="fas fa-file-excel"></i> Export Photo List
                    </button>
                </div>
                
                <table class="photo-evidence-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Q#</th>
                            <th>Question</th>
                            <th>Quarter</th>
                            <th>Photo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Close Photo Evidence Modal
function closePhotoEvidence() {
    const modal = document.getElementById('photoEvidenceModal');
    if (modal) {
        modal.remove();
    }
}

// View Full Photo
function viewFullPhoto(dataUrl, questionId, quarter) {
    const modalHtml = `
        <div class="photo-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 11000;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        " onclick="this.remove()">
            <div style="
                background: white;
                padding: 25px;
                border-radius: 12px;
                max-width: 90%;
                max-height: 90%;
                overflow: auto;
                position: relative;
            " onclick="event.stopPropagation()">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                ">
                    <h3 style="margin: 0; color: #2c3e50;">
                        <i class="fas fa-camera"></i> 
                        Photo for ${questionId} (Q${quarter})
                    </h3>
                    <button onclick="this.closest('.photo-modal').remove()" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        font-size: 20px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">&times;</button>
                </div>
                <img src="${dataUrl}" style="
                    max-width: 100%;
                    max-height: 70vh;
                    display: block;
                    margin: 0 auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                ">
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    document.body.appendChild(modal.firstElementChild);
}

// Delete Photo from Evidence View
function deletePhoto(questionId, quarter) {
    if (confirm('Are you sure you want to delete this photo?')) {
        auditState.quarters[quarter].photos = auditState.quarters[quarter].photos.filter(
            photo => photo.questionId !== questionId
        );
        
        saveAuditState();
        closePhotoEvidence();
        showPhotoEvidence(); // Refresh the modal
        showStatusMessage('Photo deleted successfully', 'success');
    }
}

// FIRST: Define the helper function
function generateDetailedPhotoHTML(photoData) {
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    
    // Group by category
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) {
            grouped[catId] = {
                category: item.category,
                items: []
            };
        }
        grouped[catId].items.push(item);
    });
    
    // Get additional stats
    const totalQuartersWithPhotos = new Set(photoData.map(item => item.quarter)).size;
    const totalCategories = Object.keys(grouped).length;
    
    // Format the audit date from header info calendar
    const auditDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not set';
    
    // Format the audit date for display (without time)
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not set';
    
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>5S Audit Photo Evidence Report</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                margin: 30px; 
                background: #f8f9fa;
                color: #2c3e50;
            }
            h1 { 
                color: #2c3e50; 
                border-bottom: 4px solid #3498db; 
                padding-bottom: 15px;
                font-size: 2.5em;
            }
            .report-header {
                background: white;
                padding: 25px;
                border-radius: 12px;
                margin-bottom: 30px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            .site-title {
                font-size: 2em;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 5px;
            }
            .site-label {
                font-size: 14px;
                color: #7f8c8d;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 20px;
            }
            .header-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 15px;
            }
            .header-item {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .header-item i {
                width: 30px;
                height: 30px;
                background: #3498db;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
            }
            .header-label {
                font-size: 12px;
                color: #7f8c8d;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .header-value {
                font-size: 16px;
                font-weight: bold;
                color: #2c3e50;
            }
            .stats-grid {
                display: flex;
                gap: 20px;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 2px solid #ecf0f1;
            }
            .stat-box {
                flex: 1;
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
            }
            .stat-number {
                font-size: 32px;
                font-weight: bold;
                color: #3498db;
            }
            .stat-label {
                font-size: 14px;
                color: #7f8c8d;
                margin-top: 5px;
            }
            .category-section {
                background: white;
                border-radius: 12px;
                margin-bottom: 30px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            .category-title {
                padding: 15px 20px;
                color: white;
                font-size: 1.3em;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .category-count {
                background: rgba(255,255,255,0.2);
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 14px;
            }
            .photo-table {
                width: 100%;
                border-collapse: collapse;
            }
            .photo-table th {
                background: #34495e;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: 600;
            }
            .photo-table td {
                padding: 15px;
                border-bottom: 1px solid #ecf0f1;
                vertical-align: middle;
            }
            .photo-table tr:hover {
                background: #f5f6fa;
            }
            .photo-thumb {
                width: 120px;
                height: 90px;
                object-fit: cover;
                border-radius: 6px;
                cursor: pointer;
                border: 3px solid #ecf0f1;
                transition: all 0.2s;
            }
            .photo-thumb:hover {
                transform: scale(1.1);
                border-color: #3498db;
                box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            }
            .quarter-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 20px;
                background: #ecf0f1;
                font-size: 12px;
                font-weight: bold;
            }
            .question-text {
                font-size: 13px;
                line-height: 1.5;
                max-width: 400px;
            }
            .meta-info {
                font-size: 12px;
                color: #7f8c8d;
                margin-top: 5px;
            }
            .footer {
                margin-top: 30px;
                text-align: center;
                color: #7f8c8d;
                font-size: 12px;
                padding: 20px;
                border-top: 1px solid #ecf0f1;
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body>
        <h1><i class="fas fa-images"></i> 5S Audit Photo Evidence Report</h1>
        
        <div class="report-header">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <div>
                    <div class="site-title">${auditState.site || 'Audit Site'}</div>
                    <div class="site-label">AUDITED AREA</div>
                </div>
                <span style="background: #3498db; color: white; padding: 8px 20px; border-radius: 25px; font-weight: bold;">
                    <i class="fas fa-calendar"></i> Audit Date: ${displayDate}
                </span>
            </div>
            
            <div class="header-grid">
                <div class="header-item">
                    <i class="fas fa-user"></i>
                    <div>
                        <div class="header-label">Auditor</div>
                        <div class="header-value">${auditState.auditor || 'Not Specified'}</div>
                    </div>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-number">${photoData.length}</div>
                    <div class="stat-label">Total Photos</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${totalCategories}</div>
                    <div class="stat-label">5S Categories</div>
                </div>
                <div class="stat-box">
                    <div class="stat-number">${totalQuartersWithPhotos}</div>
                    <div class="stat-label">Quarters with Photos</div>
                </div>
            </div>
        </div>
    `;
    
    // Add each category section
    Object.values(grouped).forEach(group => {
        const category = group.category;
        
        html += `
        <div class="category-section">
            <div class="category-title" style="background: ${category.color};">
                <span>
                    <i class="${category.icon}"></i> 
                    ${category.id} - ${category.title}
                </span>
                <span class="category-count">${group.items.length} photo${group.items.length !== 1 ? 's' : ''}</span>
            </div>
            <table class="photo-table">
                <thead>
                    <tr>
                        <th>Sub Category</th>
                        <th>Question</th>
                        <th>Quarter</th>
                        <th>Photo</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            
            html += `
                <tr>
                    <td><strong>${item.subcategory.title}</strong></td>
                    <td>
                        <div><strong>${item.question.title}:</strong></div>
                        <div class="question-text">${item.question.text}</div>
                    </td>
                    <td>
                        <span class="quarter-badge">${quarterName}</span>
                    </td>
                    <td>
                        <img src="${item.photo.dataUrl}" 
                             class="photo-thumb" 
                             alt="${item.photo.fileName}"
                             onclick="window.open(this.src)">
                    </td>
                    <td>
                        <div class="meta-info">
                            <div><i class="fas fa-file"></i> <strong>File:</strong> ${item.photo.fileName}</div>
                            <div><i class="fas fa-clock"></i> <strong>Uploaded:</strong> ${new Date(item.photo.uploadedAt).toLocaleString()}</div>
                            <div><i class="fas fa-info-circle"></i> <strong>Type:</strong> ${item.photo.fileType || 'image'}</div>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        </div>
        `;
    });
    
    html += `
        <div class="footer">
            <i class="fas fa-camera"></i> 5S Audit Photo Evidence Report - Generated by 5S Audit System<br>
            <span style="font-size: 11px;">
                <strong>Audited Area:</strong> ${auditState.site || 'Not Specified'} | 
                <strong>Audit Date:</strong> ${displayDate} | 
                This report contains ${photoData.length} photo${photoData.length !== 1 ? 's' : ''} across ${totalCategories} 5S categories
            </span>
        </div>
    </body>
    </html>
    `;
    
    return html;
}

// Export Photo List - Now opens in a modal instead of downloading
function exportPhotoList() {
    console.log('exportPhotoList called - showing photo report in modal');
    
    try {
        // Collect all photos
        const photoData = [];
        
        for (let q = 1; q <= 4; q++) {
            const quarterPhotos = auditState.quarters[q].photos || [];
            
            quarterPhotos.forEach((photo, index) => {
                let questionDetails = null;
                let categoryInfo = null;
                
                for (const category of questionsData) {
                    for (const subcat of category.subcategories) {
                        const question = subcat.questions.find(q => q.id === photo.questionId);
                        if (question) {
                            questionDetails = question;
                            categoryInfo = {
                                category: category,
                                subcategory: subcat
                            };
                            break;
                        }
                    }
                    if (questionDetails) break;
                }
                
                if (questionDetails && categoryInfo) {
                    photoData.push({
                        quarter: q,
                        category: categoryInfo.category,
                        subcategory: categoryInfo.subcategory,
                        question: questionDetails,
                        photo: photo
                    });
                }
            });
        }
        
        if (photoData.length === 0) {
            alert('No photos to display');
            return;
        }
        
        // Generate HTML content for modal
        const modalContent = generatePhotoModalContent(photoData);
        
        // Create and show modal
        showPhotoReportModal(modalContent);
        
    } catch (error) {
        console.error('Error generating photo report:', error);
        alert('Error generating photo report: ' + error.message);
    }
}

// Generate photo modal content with simplified two-column layout
function generatePhotoModalContent(photoData) {
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    
    // Group by category
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) {
            grouped[catId] = {
                category: item.category,
                items: []
            };
        }
        grouped[catId].items.push(item);
    });
    
    // Define the correct order of categories
    const categoryOrder = ['Sort', 'Systematize', 'Sweep', 'Standardize', 'Self-Discipline'];
    
    // Sort the category keys according to the defined order
    const sortedCategoryIds = Object.keys(grouped).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
    
    // Get additional stats
    const totalQuartersWithPhotos = new Set(photoData.map(item => item.quarter)).size;
    const totalCategories = Object.keys(grouped).length;
    
    // Format the audit date
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not set';
    
    let html = `
    <div class="photo-report-modal">
        <div class="photo-report-header">
            <h2><i class="fas fa-images"></i> 5S Audit Photo Evidence Report</h2>
            <div style="display: flex; gap: 10px;">
                <button onclick="exportPhotoTableToExcel()" style="
                    background: #27ae60;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: bold;
                    transition: all 0.2s;
                " onmouseover="this.style.background='#2ecc71'" onmouseout="this.style.background='#27ae60'">
                    <i class="fas fa-file-excel"></i> Export to Excel
                </button>
                <button class="photo-report-close" onclick="closePhotoReportModal()">&times;</button>
            </div>
        </div>
        <div class="photo-report-body">
            <div class="report-header">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                    <div>
                        <div class="site-title">${auditState.site || 'Audit Site'}</div>
                        <div class="site-label">AUDITED AREA</div>
                    </div>
                    <span class="audit-date-badge">
                        <i class="fas fa-calendar"></i> Audit Date: ${displayDate}
                    </span>
                </div>
                
                <div class="header-grid">
                    <div class="header-item">
                        <i class="fas fa-user"></i>
                        <div>
                            <div class="header-label">Auditor</div>
                            <div class="header-value">${auditState.auditor || 'Not Specified'}</div>
                        </div>
                    </div>
                </div>                
            </div>
`;

    // Add each category section in correct order
    sortedCategoryIds.forEach(catId => {
        const group = grouped[catId];
        const category = group.category;
        
        html += `
            <div class="category-section" style="margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div class="category-title" style="background: ${category.color}; padding: 12px 15px; color: white; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
                    <span>
                        <i class="${category.icon}"></i> 
                        ${category.id} - ${category.title}
                    </span>
                    <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 13px;">
                        ${group.items.length} photo${group.items.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f5f5f5;">
                            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd; width: 50%;">Findings based on 5S Action Plan<br>(Use dropdown box below)</th>
                            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd; width: 50%;">PHOTO EVIDENCE</th>
                         </tr>
                    </thead>
                    <tbody>
        `;
        
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            // Get comment from auditState
            const savedComment = auditState.quarters[item.quarter].comments[item.question.id] || '';
            
            html += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 15px 10px; vertical-align: top;">
                        <textarea 
                            id="photo-comment-${item.question.id}-${item.quarter}"
                            placeholder="Enter details, remarks, or action items for this finding..." 
                            style="width: 100%; min-height: 100px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit; font-size: 14px; resize: vertical;"
                            onblur="savePhotoDetails('${item.question.id}', ${item.quarter}, this.value)"
                        >${savedComment}</textarea>
                        <div style="margin-top: 8px; font-size: 11px; color: #888;">
                            <strong>Quarter:</strong> ${quarterName}
                        </div>
                     </td>
                    <td style="padding: 15px 10px; text-align: center; vertical-align: middle;">
                        <img src="${item.photo.dataUrl}" 
                             style="max-width: 200px; max-height: 150px; object-fit: contain; border-radius: 5px; cursor: pointer; border: 2px solid #ddd; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"
                             onclick="viewFullPhoto('${item.photo.dataUrl}', '${item.question.id}', ${item.quarter})"
                             title="Click to enlarge">
                        <div style="margin-top: 5px; font-size: 11px; color: #666;">
                            ${item.photo.fileName}
                        </div>
                     </td>
                 </tr>
            `;
        });
        
        html += `
                    </tbody>
                 </table>
            </div>
        `;
    });
    
    html += `
                <div style="margin-top: 20px; text-align: center; color: #666; font-size: 12px; padding: 15px; border-top: 1px solid #ddd;">
                    <i class="fas fa-camera"></i> 5S Audit Photo Evidence Report - Generated by 5S Audit System<br>
                    <span>Audit Site: ${auditState.site || 'Not Specified'} | Audit Date: ${displayDate}</span>
                </div>
            </div>
        </div>
    </div>
    `;
    
    return html;
}

// Function to save photo details
function savePhotoDetails(questionId, quarter, details) {
    console.log(`Saving details for ${questionId} in Q${quarter}:`, details);
    
    // Save to audit state
    auditState.quarters[quarter].comments[questionId] = details;
    
    // Save to localStorage
    saveAuditState();
    
    // Show a brief visual feedback
    const textarea = document.getElementById(`photo-comment-${questionId}-${quarter}`);
    if (textarea) {
        const originalBorder = textarea.style.border;
        textarea.style.border = '2px solid #27ae60';
        setTimeout(() => {
            textarea.style.border = originalBorder || '1px solid #ddd';
        }, 500);
    }
    
    console.log(`Saved details for ${questionId} in Q${quarter}`);
}

// Export Photo Table to Excel with simplified two-column format
function exportPhotoTableToExcel() {
    console.log('exportPhotoTableToExcel called - with simplified two-column format');
    
    try {
        // Collect all photos
        const photoData = [];
        
        for (let q = 1; q <= 4; q++) {
            const quarterPhotos = auditState.quarters[q].photos || [];
            
            quarterPhotos.forEach((photo, index) => {
                let questionDetails = null;
                let categoryInfo = null;
                
                for (const category of questionsData) {
                    for (const subcat of category.subcategories) {
                        const question = subcat.questions.find(q => q.id === photo.questionId);
                        if (question) {
                            questionDetails = question;
                            categoryInfo = {
                                category: category,
                                subcategory: subcat
                            };
                            break;
                        }
                    }
                    if (questionDetails) break;
                }
                
                if (questionDetails && categoryInfo) {
                    photoData.push({
                        quarter: q,
                        category: categoryInfo.category,
                        subcategory: categoryInfo.subcategory,
                        question: questionDetails,
                        photo: photo
                    });
                }
            });
        }
        
        if (photoData.length === 0) {
            alert('No photos to export');
            return;
        }
        
        // Sort by category and question
        photoData.sort((a, b) => {
            if (a.category.id !== b.category.id) return a.category.id.localeCompare(b.category.id);
            if (a.subcategory.title !== b.subcategory.title) return a.subcategory.title.localeCompare(b.subcategory.title);
            return a.question.id.localeCompare(b.question.id);
        });
        
        // Generate HTML with simplified two-column format
        const htmlContent = generateSimplifiedPhotoHTML(photoData);
        
        // Save as .xls file (HTML format that Excel can open)
        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const siteSuffix = auditState.site ? `_${auditState.site.replace(/\s+/g, '_')}` : '';
        a.download = `5S_Photo_Evidence_${dateStr}${siteSuffix}.xls`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showStatusMessage(`Photo evidence exported with ${photoData.length} photos!`, 'success');
        
    } catch (error) {
        console.error('Error exporting photo table:', error);
        alert('Error exporting to Excel: ' + error.message);
    }
}

// Generate simplified HTML for Excel with just two columns: Photo and Details
function generateSimplifiedPhotoHTML(photoData) {
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    
    // Format the audit date
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not set';
    
    // Group by category for organization
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) {
            grouped[catId] = {
                category: item.category,
                items: []
            };
        }
        grouped[catId].items.push(item);
    });
    
    // Define the correct order of categories
    const categoryOrder = ['Sort', 'Systematize', 'Sweep', 'Standardize', 'Self-Discipline'];
    
    // Sort the category keys according to the defined order
    const sortedCategoryIds = Object.keys(grouped).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
    
    let html = `<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>5S Photo Evidence Report</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 30px; background: #ffffff; }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        .header-info { background: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .category-header { 
            background: #34495e; 
            color: white; 
            padding: 12px 15px; 
            font-size: 18px; 
            font-weight: bold;
            margin-top: 25px;
            border-radius: 5px 5px 0 0;
        }
        table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
        th { 
            background: #2c3e50; 
            color: white; 
            padding: 12px 10px; 
            text-align: left; 
            font-weight: bold;
            border: 1px solid #34495e;
        }
        td { 
            padding: 15px 10px; 
            border: 1px solid #ddd; 
            vertical-align: middle;
        }
        .photo-cell { text-align: center; background-color: #f9f9f9; }
        .photo-cell img { max-width: 200px; max-height: 150px; object-fit: contain; border-radius: 5px; }
        .details-cell { background-color: white; }
        .details-cell textarea { 
            width: 100%; 
            min-height: 80px; 
            padding: 8px; 
            border: 1px solid #ccc; 
            border-radius: 4px;
            font-family: inherit;
        }
        .meta-info { font-size: 11px; color: #666; margin-top: 5px; }
        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 11px; }
    </style>
</head>
<body>
    <h1>5S AUDIT PHOTO EVIDENCE REPORT</h1>
    
    <div class="header-info">
        <p><strong>Auditor:</strong> ${auditState.auditor || 'Not Specified'} | <strong>Area:</strong> ${auditState.site || 'Not Specified'} | <strong>Audit Date:</strong> ${displayDate}</p>
        <p><strong>Total Photos:</strong> ${photoData.length} | <strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>
`;

    // Add each category in correct order
    sortedCategoryIds.forEach(catId => {
        const group = grouped[catId];
        const category = group.category;
        
        html += `
    <div class="category-header" style="background: ${category.color};">
        ${category.id} - ${category.title} (${group.items.length} photo${group.items.length !== 1 ? 's' : ''})
    </div>
    
    <table>
        <thead>
            <tr>
                <th style="width: 50%;">Findings based on 5S Action Plan<br>(Use dropdown box below)</th>
                <th style="width: 50%;">PHOTO EVIDENCE</th>
             </tr>
        </thead>
        <tbody>
        `;
        
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            const comment = auditState.quarters[item.quarter].comments[item.question.id] || '';
            
            html += `
             <tr>
                <td class="photo-cell">
                    <img src="${item.photo.dataUrl}" alt="${item.photo.fileName}">
                    <div class="meta-info">
                        ${item.photo.fileName}<br>
                        Q: ${item.question.title} (${quarterName})
                    </div>
                 </td>
                <td class="details-cell">
                    <textarea placeholder="Enter details, remarks, or action items for this finding...">${comment}</textarea>
                    <div class="meta-info">
                        <strong>Finding:</strong> ${item.question.text}
                    </div>
                 </td>
             </tr>
            `;
        });
        
        html += `
        </tbody>
     </table>
        `;
    });
    
    html += `
    <div class="footer">
        <p>5S Audit Photo Evidence Report - Generated by 5S Audit System on ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>`;
    
    return html;
}

// Generate simplified HTML for Excel with just two columns: Findings and Photo
function generateSimplifiedPhotoHTML(photoData) {
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    
    // Format the audit date
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not set';
    
    // Group by category for organization
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) {
            grouped[catId] = {
                category: item.category,
                items: []
            };
        }
        grouped[catId].items.push(item);
    });
    
    let html = `<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>5S Action Plan - Findings and Photos</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 30px; 
            background: #ffffff; 
        }
        h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #3498db; 
            padding-bottom: 10px;
            font-size: 24px;
        }
        .header-info {
            background: #f8f9fa;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .site-badge {
            background: #3498db;
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 14px;
        }
        .auditor-info {
            color: #2c3e50;
            font-size: 14px;
        }
        .category-header {
            background: #34495e;
            color: white;
            padding: 12px 15px;
            font-size: 18px;
            font-weight: bold;
            margin-top: 25px;
            margin-bottom: 10px;
            border-radius: 5px 5px 0 0;
        }
        .subcategory-header {
            background: #ecf0f1;
            padding: 8px 15px;
            font-weight: bold;
            color: #2c3e50;
            margin-top: 10px;
            border-left: 4px solid #3498db;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 30px;
            table-layout: fixed;
        }
        th {
            background: #2c3e50;
            color: white;
            padding: 12px 10px;
            text-align: left;
            font-weight: bold;
            font-size: 14px;
        }
        td {
            padding: 15px 10px;
            border: 1px solid #ddd;
            vertical-align: middle;
        }
        .findings-cell {
            width: 50%;
            background-color: #f9f9f9;
            font-size: 13px;
            line-height: 1.5;
        }
        .photo-cell {
            width: 50%;
            text-align: center;
            background-color: white;
        }
        .photo-cell img {
            max-width: 200px;
            max-height: 150px;
            object-fit: contain;
            border-radius: 5px;
            border: 2px solid #3498db;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .findings-text {
            color: #2c3e50;
        }
        .findings-text strong {
            color: #3498db;
            font-size: 14px;
        }
        .findings-meta {
            font-size: 11px;
            color: #7f8c8d;
            margin-top: 8px;
            padding-top: 5px;
            border-top: 1px dashed #ccc;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #7f8c8d;
            font-size: 11px;
            padding: 15px;
            border-top: 2px solid #ecf0f1;
        }
        .stats-summary {
            display: flex;
            gap: 15px;
            margin: 20px 0;
            padding: 15px;
            background: #f0f7ff;
            border-radius: 8px;
            border-left: 5px solid #3498db;
        }
        .stat-item {
            flex: 1;
            text-align: center;
        }
        .stat-value {
            font-size: 28px;
            font-weight: bold;
            color: #2c3e50;
        }
        .stat-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <h1>5S ACTION PLAN - FINDINGS & PHOTO EVIDENCE</h1>
    
    <div class="header-info">
        <div class="auditor-info">
            <strong><i class="fas fa-user"></i> Auditor:</strong> ${auditState.auditor || 'Not Specified'} &nbsp; | &nbsp;
            <strong><i class="fas fa-map-marker-alt"></i> Area:</strong> ${auditState.site || 'Not Specified'}
        </div>
        <div class="site-badge">
            <i class="fas fa-calendar"></i> Audit Date: ${displayDate}
        </div>
    </div>
`;
    
    // Add each category
    Object.values(grouped).forEach(group => {
        const category = group.category;
        
        html += `
    <div class="category-header" style="background: ${category.color};">
        <i class="${category.icon}" style="margin-right: 10px;"></i>
        ${category.id} - ${category.title}
        <span style="float: right; background: rgba(255,255,255,0.2); padding: 3px 12px; border-radius: 20px; font-size: 14px;">
            ${group.items.length} Finding${group.items.length !== 1 ? 's' : ''}
        </span>
    </div>
    
    <table>
        <thead>
            <tr>
                <th style="width: 50%;">FINDINGS BASED ON 5S ACTION PLAN</th>
                <th style="width: 50%;">PHOTO EVIDENCE</th>
            </tr>
        </thead>
        <tbody>
        `;
        
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            const comment = auditState.quarters[item.quarter].comments[item.question.id] || '';
            
            html += `
            <tr>
                <td class="findings-cell">
                    <div class="findings-text">
                        <strong>${item.question.title}:</strong> ${item.question.text}
                    </div>
                    
                    <div style="margin-top: 10px; padding: 8px; background: #fff8e7; border-left: 4px solid #f39c12;">
                        <strong style="color: #e67e22;">📋 Observation/Comment:</strong>
                        <p style="margin: 5px 0 0 0; color: #2c3e50;">${comment ? comment : 'No specific comments recorded'}</p>
                    </div>
                    
                    <div class="findings-meta">
                        <span style="margin-right: 15px;"><strong>Category:</strong> ${item.subcategory.title}</span>
                        <span><strong>Quarter:</strong> ${quarterName}</span>
                    </div>
                    
                    <div style="margin-top: 8px; font-size: 11px; color: #888;">
                        <span>📅 Uploaded: ${new Date(item.photo.uploadedAt).toLocaleString()}</span>
                    </div>
                </td>
                <td class="photo-cell">
                    <img src="${item.photo.dataUrl}" 
                         alt="${item.photo.fileName}"
                         title="${item.photo.fileName}">
                    <div style="margin-top: 8px; font-size: 11px; color: #666;">
                        <i class="fas fa-file-image"></i> ${item.photo.fileName}
                    </div>
                </td>
            </tr>
            `;
        });
        
        html += `
        </tbody>
    </table>
        `;
    });
    
    html += `
    
</body>
</html>`;
    
    return html;
}

// Generate HTML for Excel with embedded images
// Generate HTML for Excel with embedded images and comments
function generatePhotoExcelHTML(photoData) {
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    
    // Group by category
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) {
            grouped[catId] = {
                category: item.category,
                items: []
            };
        }
        grouped[catId].items.push(item);
    });
    
    // Format the audit date
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not set';
    
    let html = `<?xml version="1.0"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>5S Audit Photo Evidence Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; background: #ffffff; }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { color: #2c3e50; margin: 20px 0 10px 0; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 30px; }
        .stats { display: flex; gap: 20px; margin: 20px 0; }
        .stat-box { background: #e9ecef; padding: 15px; border-radius: 8px; text-align: center; flex: 1; }
        .stat-number { font-size: 24px; font-weight: bold; color: #3498db; }
        .stat-label { font-size: 12px; color: #666; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
        th { background: #34495e; color: white; padding: 12px; text-align: left; font-weight: bold; }
        td { padding: 12px; border: 1px solid #ddd; vertical-align: middle; }
        tr:nth-child(even) { background: #f8f9fa; }
        .category-header { 
            background: #2c3e50; 
            color: white; 
            padding: 15px; 
            font-size: 18px; 
            font-weight: bold;
            margin-top: 20px;
        }
        .photo-cell img { 
            max-width: 150px; 
            max-height: 100px; 
            object-fit: cover; 
            border-radius: 5px; 
            border: 2px solid #ddd;
        }
        .badge {
            background: #e0e0e0;
            padding: 3px 10px;
            border-radius: 15px;
            font-size: 12px;
            display: inline-block;
        }
        .comment-cell {
            max-width: 250px;
            font-size: 11px;
            color: #2c3e50;
            word-wrap: break-word;
        }
        .footer { 
            margin-top: 30px; 
            text-align: center; 
            color: #666; 
            font-size: 11px; 
            border-top: 1px solid #ddd; 
            padding-top: 20px; 
        }
    </style>
</head>
<body>
    <h1>5S Audit Photo Evidence Report</h1>
    
    <div class="header">
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
                <h2 style="margin: 0;">${auditState.site || 'Audit Site'}</h2>
                <p style="color: #666; margin: 5px 0;">AUDITED AREA</p>
            </div>
            <div style="background: #3498db; color: white; padding: 10px 20px; border-radius: 25px;">
                <strong>Audit Date:</strong> ${displayDate}
            </div>
        </div>
        
        <div style="display: flex; gap: 20px; margin: 15px 0; color: #666;">
            <div><strong>Auditor:</strong> ${auditState.auditor || 'Not Specified'}</div>
            <div><strong>Generated:</strong> ${new Date().toLocaleString()}</div>
            <div><strong>Report ID:</strong> #${new Date().getTime().toString().slice(-8)}</div>
        </div>
        
        <div class="stats">
            <div class="stat-box">
                <div class="stat-number">${photoData.length}</div>
                <div class="stat-label">Total Photos</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">${Object.keys(grouped).length}</div>
                <div class="stat-label">5S Categories</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">${new Set(photoData.map(item => item.quarter)).size}</div>
                <div class="stat-label">Quarters with Photos</div>
            </div>
        </div>
    </div>`;
    
    // Add each category as a separate table
    Object.values(grouped).forEach(group => {
        const category = group.category;
        
        html += `
    <h2 style="color: ${category.color}; border-left: 5px solid ${category.color}; padding-left: 10px;">
        <i class="${category.icon}" style="margin-right: 10px;"></i>${category.id} - ${category.title}
        <span style="float: right; font-size: 14px; color: #666; background: #f0f0f0; padding: 5px 15px; border-radius: 20px;">
            ${group.items.length} photo${group.items.length !== 1 ? 's' : ''}
        </span>
    </h2>
    
    <table>
        <thead>
            <tr>
                <th>Sub Category</th>
                <th>Question ID</th>
                <th>Question</th>
                <th>Quarter</th>
                <th>Photo</th>
                <th>Comments</th> <!-- NEW COLUMN -->
                <th>File Name</th>
                <th>Uploaded Date</th>
            </tr>
        </thead>
        <tbody>
        `;
        
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            // Get comment for this question and quarter
            const comment = auditState.quarters[item.quarter].comments[item.question.id] || '';
            
            html += `
            <tr>
                <td><strong>${item.subcategory.title}</strong></td>
                <td>${item.question.title}</td>
                <td>${item.question.text}</td>
                <td><span class="badge">${quarterName}</span></td>
                <td class="photo-cell">
                    <img src="${item.photo.dataUrl}" alt="${item.photo.fileName}">
                </td>
                <td class="comment-cell">${comment ? comment : '—'}</td> <!-- NEW COLUMN DATA -->
                <td>${item.photo.fileName}</td>
                <td>${new Date(item.photo.uploadedAt).toLocaleDateString()}</td>
            </tr>
            `;
        });
        
        html += `
        </tbody>
    </table>
        `;
    });
    
    html += `
    <div class="footer">
        <p>5S Audit Photo Evidence Report - Generated by 5S Audit System</p>
        <p>${auditState.site || 'Audit Site'} | Audit Date: ${displayDate} | Total Photos: ${photoData.length}</p>
    </div>
</body>
</html>`;
    
    return html;
}

// Show photo report modal
// Show photo report modal
function showPhotoReportModal(content) {
    // Close any existing photo report modal
    const existingModal = document.getElementById('photoReportModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'photoReportModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 11000;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        padding: 20px;
    `;
    
    // Create modal content wrapper
    const modalWrapper = document.createElement('div');
    modalWrapper.style.cssText = `
        background: white;
        width: 95%;
        max-width: 1400px;
        height: 90vh;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
    `;
    
    modalWrapper.innerHTML = content;
    modal.appendChild(modalWrapper);
    document.body.appendChild(modal);
}

// Close photo report modal
function closePhotoReportModal() {
    const modal = document.getElementById('photoReportModal');
    if (modal) {
        modal.remove();
    }
}

// Add this function - it's missing from your code
function getScoreRating(score) {
    if (score >= 3.21) return "Level 5";
    if (score >= 2.41) return "Level 4";
    if (score >= 1.61) return "Level 3";
    if (score >= 0.81) return "Level 2";
    return "Level 1";
}

// CSV Export function
// CSV Export function
// CSV Export function
// CSV Export function
function exportToCSV(quarter) {
    console.log('exportToCSV called for quarter:', quarter);
    
    try {
        const quarterName = getQuarterName(quarter);
        
        // Get the actual date
        const auditDate = auditState.auditDate || new Date().toISOString().split('T')[0];
        const formattedDate = new Date(auditDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create CSV content - REMOVED year line
        let csvContent = "5S GOOD HOUSEKEEPING PROGRAM SCORESHEET\n";
        csvContent += `${quarterName} Quarter Audit Report\n`;
        csvContent += `Auditor,${auditState.auditor || 'Not Specified'}\n`;
        csvContent += `Audit Site,${auditState.site || 'Not Specified'}\n`;
        csvContent += `Audit Date,${formattedDate}\n`;
        csvContent += `Report Generated,${new Date().toLocaleString()}\n\n`;
        
        // Headers with Sub Category - MODIFIED: Question ID to Question #
        csvContent += "Category,Sub Category,Question #,Question,Score,Comments\n";
        
        // Track current category to avoid repetition
        let lastCategory = '';
        let lastSubcategory = '';
        
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    const score = auditState.quarters[quarter].scores[question.id] || 0;
                    const comment = auditState.quarters[quarter].comments[question.id] || '';
                    
                    // Only show category if it's different from last
                    const categoryDisplay = (category.id !== lastCategory) ? category.id : '';
                    lastCategory = category.id;
                    
                    // Only show subcategory if it's different from last within the same category
                    const subcatDisplay = (subcat.title !== lastSubcategory) ? subcat.title : '';
                    lastSubcategory = subcat.title;
                    
                    // Escape quotes
                    const questionText = question.text.replace(/"/g, '""');
                    const commentText = comment.replace(/"/g, '""');
                    
                    csvContent += `"${categoryDisplay}","${subcatDisplay}","${question.title}","${questionText}",${score},"${commentText}"\n`;
                });
            });
            // Reset subcategory when category changes
            lastSubcategory = '';
        });
        
        // Add summary
        csvContent += "\nCATEGORY SUMMARY\n";
        csvContent += "Category,Average Score,Rating\n";
        
        questionsData.forEach(category => {
            const score = calculateCategoryScore(category.id, quarter);
            csvContent += `"${category.id}",${score.toFixed(2)},"${getScoreRating(score)}"\n`;
        });
        
        // Add total average
        let totalQuestions = 0;
        let totalScore = 0;
        
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    totalQuestions++;
                    totalScore += auditState.quarters[quarter].scores[question.id] || 0;
                });
            });
        });
        
        const averageScore = totalQuestions > 0 ? (totalScore / totalQuestions).toFixed(2) : '0.00';
        csvContent += `\nTOTAL AVERAGE SCORE,${averageScore}/4.00,${getScoreRating(parseFloat(averageScore))}\n`;
        
        // Add last updated info
        if (auditState.quarters[quarter].lastUpdated) {
            const lastUpdated = new Date(auditState.quarters[quarter].lastUpdated).toLocaleString();
            csvContent += `\nLast Updated,${lastUpdated}\n`;
        }
        
        // Create download with site in filename
        const dateStr = auditDate.replace(/-/g, '');
        const siteSuffix = auditState.site ? `_${auditState.site.replace(/\s+/g, '_')}` : '';
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `5S_Audit_Q${quarter}_${auditState.year}_${dateStr}${siteSuffix}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showStatusMessage(`${quarterName} Quarter saved as CSV`, 'info');
        
    } catch (error) {
        console.error('Error in exportToCSV:', error);
        alert('Error saving CSV: ' + error.message);
    }
}



// Open Excel File (placeholder function)
// Open Excel File
function openExcelFile() {
    // Create a hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx, .xls, .csv, .txt';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Read and display the file
        readFile(file);
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// Read file function
function readFile(file) {
    const reader = new FileReader();
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    reader.onload = function(e) {
        try {
            let data = e.target.result;
            let fileContent = '';
            let fileName = file.name;
            
            // Handle different file types
            if (fileExtension === 'csv' || fileExtension === 'txt') {
                // For CSV/TXT files, display as text
                fileContent = data;
                showFileContentModal(fileContent, fileName, 'csv');
            } 
            else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                // For Excel files, try to parse with XLSX
                if (typeof XLSX !== 'undefined' && XLSX.utils) {
                    try {
                        const workbook = XLSX.read(data, { type: 'binary' });
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                        
                        // Convert to readable format
                        fileContent = jsonData.map(row => row.join('\t')).join('\n');
                        showFileContentModal(fileContent, fileName, 'excel');
                    } catch (xlsxError) {
                        console.error('XLSX parsing error:', xlsxError);
                        // If XLSX fails, show raw content
                        fileContent = "Error parsing Excel file. Raw data:\n\n" + data;
                        showFileContentModal(fileContent, fileName, 'error');
                    }
                } else {
                    fileContent = "Excel library not loaded. Cannot parse Excel file.\n\nRaw data:\n" + data;
                    showFileContentModal(fileContent, fileName, 'error');
                }
            }
            else {
                // Unknown file type
                fileContent = "Unsupported file type. Please select .xlsx, .xls, or .csv file.\n\nRaw data:\n" + data;
                showFileContentModal(fileContent, fileName, 'error');
            }
            
        } catch (error) {
            console.error('Error reading file:', error);
            alert('Error reading file: ' + error.message);
        }
    };
    
    reader.onerror = function(error) {
        console.error('FileReader error:', error);
        alert('Error reading file: ' + error);
    };
    
    // Read based on file type
    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        reader.readAsBinaryString(file);
    } else {
        reader.readAsText(file);
    }
}

// Show file content in modal
function showFileContentModal(content, fileName, fileType) {
    // Create modal
    const modalHtml = `
        <div class="file-viewer-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        ">
            <div style="
                background: white;
                width: 90%;
                height: 90%;
                border-radius: 10px;
                padding: 20px;
                display: flex;
                flex-direction: column;
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #eee;
                ">
                    <div>
                        <h3 style="margin: 0;">
                            <i class="fas ${fileType === 'csv' ? 'fa-file-csv' : fileType === 'excel' ? 'fa-file-excel' : 'fa-file'}" 
                               style="color: ${fileType === 'csv' ? '#27ae60' : fileType === 'excel' ? '#2ecc71' : '#e74c3c'};"></i>
                            File Viewer: ${fileName}
                        </h3>
                        <p style="margin: 5px 0 0; color: #666; font-size: 12px;">
                            Type: ${fileType.toUpperCase()} | Size: ${content.length} characters
                        </p>
                    </div>
                    <button onclick="this.closest('.file-viewer-modal').remove()" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                    ">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
                <div style="
                    flex-grow: 1;
                    overflow: auto;
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    line-height: 1.5;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                ">
                    ${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </div>
                <div style="
                    margin-top: 15px;
                    padding-top: 10px;
                    border-top: 1px solid #eee;
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                ">
                    <button onclick="downloadFileContent('${fileName}', this)" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">
                        <i class="fas fa-download"></i> Download File
                    </button>
                    <button onclick="copyFileContent(this)" style="
                        background: #f39c12;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">
                        <i class="fas fa-copy"></i> Copy to Clipboard
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    document.body.appendChild(modal);
    
    // Store content for download/copy functions
    modal.querySelector('.file-viewer-modal').dataset.content = content;
    modal.querySelector('.file-viewer-modal').dataset.filename = fileName;
}

// Helper function to download file content
function downloadFileContent(filename, button) {
    const modal = button.closest('.file-viewer-modal');
    const content = modal.dataset.content;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Helper function to copy content to clipboard
function copyFileContent(button) {
    const modal = button.closest('.file-viewer-modal');
    const content = modal.dataset.content;
    
    navigator.clipboard.writeText(content).then(() => {
        alert('Content copied to clipboard!');
    }).catch(err => {
        console.error('Copy failed:', err);
        alert('Failed to copy content');
    });
}

function readExcelFile(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get the first sheet
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // Display in a modal or console
            console.log('Excel data:', jsonData);
            
            // You can create a modal to show the data
            showExcelDataModal(jsonData, file.name);
            
        } catch (error) {
            console.error('Error reading Excel file:', error);
            alert('Error reading Excel file. Make sure it\'s a valid .xlsx or .xls file.');
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// Restart Audit
function restartAudit() {
    if (confirm('Are you sure you want to restart the audit? This will clear all current data.')) {
        // Reset audit state
        auditState.quarters = {
            1: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false },
            2: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false },
            3: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false },
            4: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false }
        };
        
        // Reload current quarter
        loadQuarterContent(auditState.currentQuarter);
        
        // Update summary
        updateSheetSummary();
        
        // Save state
        saveAuditState();
        
        showStatusMessage('Audit has been restarted.', 'info');
    }
}

// Update showAuditResults function
function showAuditResults() {
    const modal = document.getElementById('auditResultsModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Force update the date from input if needed
        const dateInput = document.getElementById('auditDate');
        if (dateInput && dateInput.value && (!auditState.auditDate || auditState.auditDate !== dateInput.value)) {
            auditState.auditDate = dateInput.value;
            saveAuditState();
        }
        
        updateAuditResultsModal();
        
        // Also update the site in the modal
        const siteElement = document.querySelector('.audit-info-item:nth-child(3) .info-value');
        if (siteElement) {
            siteElement.textContent = auditState.site || 'Not Specified';
        }
        
        // Auto-load the summary table FIRST
        setTimeout(populateSummaryTable, 300);
        
        // Then update modal totals AFTER the table is populated
        setTimeout(updateModalTotals, 400);
    }
}

// Close Audit Results
function closeAuditResults() {
    const modal = document.getElementById('auditResultsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Update Audit Results Modal
// Update Audit Results Modal
// Update Audit Results Modal
function updateAuditResultsModal() {
    console.log('Updating audit results modal');
    console.log('auditState.auditDate:', auditState.auditDate);
    
    // Update audit info
    const auditorElement = document.getElementById('modal-auditor');
    const dateElement = document.getElementById('modal-audit-date');
    const siteElement = document.querySelector('.audit-info-item:nth-child(3) .info-value');
    const statusElement = document.getElementById('modal-status');
    
    if (auditorElement) auditorElement.textContent = auditState.auditor || 'Not Specified';
    
    // Format and display the date
    if (dateElement) {
        if (auditState.auditDate) {
            try {
                const date = new Date(auditState.auditDate);
                // Check if date is valid
                if (!isNaN(date.getTime())) {
                    const formattedDate = date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    dateElement.textContent = formattedDate;
                    console.log('Formatted date:', formattedDate);
                } else {
                    dateElement.textContent = auditState.auditDate; // Show raw value if invalid
                    console.log('Invalid date string:', auditState.auditDate);
                }
            } catch (e) {
                console.error('Error formatting date:', e);
                dateElement.textContent = auditState.auditDate;
            }
        } else {
            // Try to get from input if not in state
            const dateInput = document.getElementById('auditDate');
            if (dateInput && dateInput.value) {
                auditState.auditDate = dateInput.value;
                saveAuditState();
                
                const date = new Date(dateInput.value);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                dateElement.textContent = formattedDate;
            } else {
                dateElement.textContent = 'Not Set';
            }
        }
    }
    
    // Update site
    if (siteElement) {
        siteElement.textContent = auditState.site || 'DOST Office';
    }
    
    // Update overall status
    let completedQuarters = 0;
    let totalQuestions = getTotalQuestionsCount();
    let answeredQuestions = 0;
    
    for (let q = 1; q <= 4; q++) {
        const quarterScores = auditState.quarters[q].scores || {};
        const quarterAnswered = Object.keys(quarterScores).length;
        answeredQuestions += quarterAnswered;
        if (quarterAnswered > 0) completedQuarters++;
    }
    
    if (completedQuarters === 0) {
        if (statusElement) statusElement.textContent = 'Not Started';
    } else if (answeredQuestions >= totalQuestions * 4) { // All quarters fully answered
        if (statusElement) statusElement.textContent = 'Completed';
    } else {
        if (statusElement) statusElement.textContent = 'In Progress';
    }
    
    // Update category scores in modal
    updateModalCategoryScores();
}

// Update Modal Category Scores
function updateModalCategoryScores() {
    const categories = ['sort', 'systematize', 'sweep', 'standardize', 'discipline'];
    const currentQuarter = auditState.currentQuarter;
    
    categories.forEach(category => {
        const element = document.getElementById(`modal-${category}`);
        if (element) {
            const scoreValue = element.querySelector('.score-value');
            const scoreFill = element.querySelector('.score-fill');
            
            // Get actual category ID (capitalized)
            const categoryId = category === 'discipline' ? 'Self-Discipline' 
                            : category.charAt(0).toUpperCase() + category.slice(1);
            
            const score = calculateCategoryScore(categoryId, currentQuarter);
            const maxScore = 4; // Maximum average score
            
            if (scoreValue) scoreValue.textContent = score.toFixed(2);
            if (scoreFill) scoreFill.style.width = `${(score / maxScore * 100)}%`;
        }
    });
}

// Show Status Message
function showStatusMessage(message, type = 'info') {
    const statusElement = document.getElementById('statusMessage');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `status-message ${type}`;
        statusElement.style.display = 'block';
        
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 3000);
    }
}

// Populate Summary Table (for modal) - COMPLETELY NO COLOR CODING
function populateSummaryTable() {
    console.log('populateSummaryTable called - NO COLOR CODING');
    
    const tableBody = document.getElementById('summaryTableBody');
    if (!tableBody) {
        console.error('Table body not found');
        return;
    }
    
    // Clear the table body
    tableBody.innerHTML = '';
    
    // Track current values for grouping
    let lastCategory = '';
    let lastSubcategory = '';
    let currentCategoryIndex = -1;
    
    questionsData.forEach((category, catIndex) => {
        category.subcategories.forEach(subcat => {
            subcat.questions.forEach((question, qIndex) => {
                const row = document.createElement('tr');
                
                // Get scores for each quarter
                const q1Score = auditState.quarters[1].scores[question.id] || 0;
                const q2Score = auditState.quarters[2].scores[question.id] || 0;
                const q3Score = auditState.quarters[3].scores[question.id] || 0;
                const q4Score = auditState.quarters[4].scores[question.id] || 0;
                
                // Check if scores were explicitly set
                const q1Set = auditState.quarters[1].scoreSet?.[question.id] || false;
                const q2Set = auditState.quarters[2].scoreSet?.[question.id] || false;
                const q3Set = auditState.quarters[3].scoreSet?.[question.id] || false;
                const q4Set = auditState.quarters[4].scoreSet?.[question.id] || false;
                
                // Truncate long question text for display
                let questionText = question.text;
                if (questionText.length > 100) {
                    questionText = questionText.substring(0, 97) + '...';
                }
                
                // Create cells
                const categoryCell = document.createElement('td');
                const subcategoryCell = document.createElement('td');
                const qIdCell = document.createElement('td');
                const questionCell = document.createElement('td');
                const q1Cell = document.createElement('td');
                const q2Cell = document.createElement('td');
                const q3Cell = document.createElement('td');
                const q4Cell = document.createElement('td');
                
                // Set category cell content (only if different from last)
                if (category.title !== lastCategory) {
                    categoryCell.innerHTML = `<strong>${category.title}</strong>`;
                    // FORCE REMOVE any inline color styles
                    categoryCell.style.color = '';
                    lastCategory = category.title;
                    currentCategoryIndex = catIndex;
                    
                    // Add a top border for new category (except first)
                    if (catIndex > 0) {
                        row.classList.add('category-separator');
                    }
                } else {
                    categoryCell.innerHTML = ''; // Empty for repeated categories
                    // Remove border from empty cells
                    categoryCell.style.borderTop = 'none';
                    categoryCell.style.borderBottom = 'none';
                }
                
                // Set subcategory cell content (only if different from last within same category)
                if (subcat.title !== lastSubcategory) {
                    subcategoryCell.innerHTML = `<em>${subcat.title}</em>`;
                    // FORCE REMOVE any inline color styles
                    subcategoryCell.style.color = '';
                    lastSubcategory = subcat.title;
                } else {
                    subcategoryCell.innerHTML = ''; // Empty for repeated subcategories
                    // Remove border from empty cells
                    subcategoryCell.style.borderTop = 'none';
                    subcategoryCell.style.borderBottom = 'none';
                }
                
                // Set question cells
                qIdCell.textContent = question.title;
                qIdCell.className = 'text-center';
                
                questionCell.textContent = questionText;
                questionCell.title = question.text;
                
                // Determine score classes - ONLY for score colors
                const q1Class = (q1Set || q1Score > 0) ? getScoreClass(q1Score) : 'score-default';
                const q2Class = (q2Set || q2Score > 0) ? getScoreClass(q2Score) : 'score-default';
                const q3Class = (q3Set || q3Score > 0) ? getScoreClass(q3Score) : 'score-default';
                const q4Class = (q4Set || q4Score > 0) ? getScoreClass(q4Score) : 'score-default';
                
                // Set score cells with proper color coding
                q1Cell.textContent = q1Score;
                q1Cell.className = `text-center score-cell ${q1Class}`;
                q1Cell.setAttribute('data-score', q1Score);
                q1Cell.setAttribute('data-set', q1Set);
                
                q2Cell.textContent = q2Score;
                q2Cell.className = `text-center score-cell ${q2Class}`;
                q2Cell.setAttribute('data-score', q2Score);
                q2Cell.setAttribute('data-set', q2Set);
                
                q3Cell.textContent = q3Score;
                q3Cell.className = `text-center score-cell ${q3Class}`;
                q3Cell.setAttribute('data-score', q3Score);
                q3Cell.setAttribute('data-set', q3Set);
                
                q4Cell.textContent = q4Score;
                q4Cell.className = `text-center score-cell ${q4Class}`;
                q4Cell.setAttribute('data-score', q4Score);
                q4Cell.setAttribute('data-set', q4Set);
                
                // NO COLOR CODING - All category color styling removed
                
                // Remove borders from empty cells
                if (categoryCell.innerHTML === '') {
                    categoryCell.style.borderTop = 'none';
                    categoryCell.style.borderBottom = 'none';
                }
                if (subcategoryCell.innerHTML === '') {
                    subcategoryCell.style.borderTop = 'none';
                    subcategoryCell.style.borderBottom = 'none';
                }
                
                // Add all cells to row
                row.appendChild(categoryCell);
                row.appendChild(subcategoryCell);
                row.appendChild(qIdCell);
                row.appendChild(questionCell);
                row.appendChild(q1Cell);
                row.appendChild(q2Cell);
                row.appendChild(q3Cell);
                row.appendChild(q4Cell);
                
                tableBody.appendChild(row);
            });
        });
        // Reset subcategory tracking when category changes
        lastSubcategory = '';
    });
    
    // Count total questions
    let totalQuestions = 0;
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            totalQuestions += subcat.questions.length;
        });
    });
    
    // Update the total questions count in the scoring details
    const totalQuestionsSpan = document.getElementById('totalQuestionsCount');
    if (totalQuestionsSpan) {
        totalQuestionsSpan.textContent = totalQuestions;
    }
    
    const totalPossibleSpan = document.getElementById('totalPossibleScore');
    if (totalPossibleSpan) {
        totalPossibleSpan.textContent = totalQuestions * 4;
    }
    
    // Add CSS styles for the table
    addSummaryTableStyles();
    
    showStatusMessage(`Summary table loaded with ${totalQuestions} questions!`, 'success');
    console.log(`Table populated with ${totalQuestions} questions`);
    setTimeout(updateModalTotals, 100);
}

// Add CSS styles for the summary table - NO CATEGORY COLORS, ALL SCORE CELLS BLACK TEXT
function addSummaryTableStyles() {
    // Check if styles already exist
    if (document.getElementById('summary-table-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'summary-table-styles';
    style.textContent = `
        /* Summary table styling */
        #summaryTable {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }
        
        #summaryTable th {
            background-color: #34495e;
            color: white;
            padding: 10px 5px;
            font-weight: 600;
            text-align: left;
            border: 1px solid #2c3e50;
        }
        
        #summaryTable td {
            padding: 8px 5px;
            border: 1px solid #ddd;
            vertical-align: middle;
        }
        
        /* COMPLETELY REMOVE ALL BORDERS FROM EMPTY CELLS */
        #summaryTable td:empty,
        #summaryTable td:blank {
            border: none !important;
            background-color: transparent !important;
            box-shadow: none !important;
        }
        
        /* ========== CATEGORY CELLS - NO COLORS ========== */
        /* Remove all colored text from category cells ONLY */
        #summaryTable td:first-child:not(:empty),
        #summaryTable td:first-child strong,
        #summaryTable td:nth-child(1) strong {
            color: #2c3e50 !important;
            background-color: transparent !important;
            border-left: none !important;
        }
        
        /* Remove colored left borders from rows */
        #summaryTable tr {
            border-left: none !important;
        }
        
        /* Remove colored backgrounds from category and subcategory cells ONLY */
        #summaryTable td:first-child,
        #summaryTable td:nth-child(2) {
            background-color: transparent !important;
        }
        
        /* Make sure subcategory cells have no colors */
        #summaryTable td:nth-child(2):not(:empty) {
            color: #2c3e50 !important;
            background-color: transparent !important;
            font-style: italic;
        }
        
        /* ========== SCORE CELLS - ALL BLACK TEXT, NO BACKGROUND ========== */
        /* Score cell styling */
        .score-cell {
            font-weight: bold;
            text-align: center;
        }
        
        /* ALL score cells - transparent background, BLACK text */
        #summaryTable td.score-cell,
        #summaryTable td.score-default,
        #summaryTable td.score-excellent,
        #summaryTable td.score-good,
        #summaryTable td.score-fair,
        #summaryTable td.score-poor,
        #summaryTable td.score-none {
            color: #000000 !important;
            background-color: transparent !important;
            font-weight: bold;
        }
        
        /* ========== OTHER COLUMNS - DARK TEXT ========== */
        /* Ensure the question numbers column (column 3) stays dark */
        #summaryTable td:nth-child(3) {
            color: #2c3e50 !important;
            font-weight: 600;
        }
        
        /* Ensure the question text column (column 4) stays dark */
        #summaryTable td:nth-child(4) {
            color: #2c3e50 !important;
        }
        
        /* Hover effect on rows */
        #summaryTable tbody tr:hover {
            background-color: #f5f5f5 !important;
        }
    `;
    
    document.head.appendChild(style);
}

// Force all score cells to have black text
function forceBlackScoreText() {
    setTimeout(function() {
        // Get all score cells (columns 5-8)
        const scoreCells = document.querySelectorAll('#summaryTable tbody td:nth-child(5), #summaryTable tbody td:nth-child(6), #summaryTable tbody td:nth-child(7), #summaryTable tbody td:nth-child(8)');
        
        scoreCells.forEach(function(cell) {
            // Force black text
            cell.style.color = '#000000 !important';
            cell.style.backgroundColor = 'transparent !important';
            cell.style.setProperty('color', '#000000', 'important');
            cell.style.setProperty('background-color', 'transparent', 'important');
        });
        
        console.log('Score cells forced to black text:', scoreCells.length);
    }, 500);
}

// Get Score CSS Class - ALWAYS RETURN DEFAULT
function getScoreClass(score) {
    return 'score-default';
}

// Add this function to update the maturity table
function updateMaturityTable() {
    const container = document.getElementById('maturity-table-container');
    if (container) {
        container.innerHTML = generateMaturityTableWithRightCheckmarks();
    }
}

// Modify your existing generateMaturityTableWithRightCheckmarks function to include all levels
function generateMaturityTableWithRightCheckmarks() {
    // Get the annual average scores
    const sortAvg = parseFloat(document.getElementById('sort-avg')?.textContent || '0');
    const systAvg = parseFloat(document.getElementById('systematize-avg')?.textContent || '0');
    const sweepAvg = parseFloat(document.getElementById('sweep-avg')?.textContent || '0');
    const standAvg = parseFloat(document.getElementById('standardize-avg')?.textContent || '0');
    const discAvg = parseFloat(document.getElementById('discipline-avg')?.textContent || '0');
    
    // Define conditions for each level
    const level5 = {
        sort: sortAvg >= 3.21,
        systematize: systAvg >= 3.21,
        sweep: sweepAvg >= 3.21,
        standardize: standAvg >= 3.21,
        discipline: discAvg >= 3.21
    };
    
    const level4 = {
        sort: sortAvg >= 2.41 && sortAvg < 3.21,
        systematize: systAvg >= 2.41 && systAvg < 3.21,
        sweep: sweepAvg >= 2.41 && sweepAvg < 3.21,
        standardize: standAvg >= 2.41 && standAvg < 3.21,
        discipline: discAvg >= 2.41 && discAvg < 3.21
    };
    
    const level3 = {
        sort: sortAvg >= 1.61 && sortAvg < 2.41,
        systematize: systAvg >= 1.61 && systAvg < 2.41,
        sweep: sweepAvg >= 1.61 && sweepAvg < 2.41,
        standardize: standAvg >= 1.61 && standAvg < 2.41,
        discipline: discAvg >= 1.61 && discAvg < 2.41
    };
    
    const level2 = {
        sort: sortAvg >= 0.81 && sortAvg < 1.61,
        systematize: systAvg >= 0.81 && systAvg < 1.61,
        sweep: sweepAvg >= 0.81 && sweepAvg < 1.61,
        standardize: standAvg >= 0.81 && standAvg < 1.61,
        discipline: discAvg >= 0.81 && discAvg < 1.61
    };
    
    const level1 = {
        sort: sortAvg < 0.81,
        systematize: systAvg < 0.81,
        sweep: sweepAvg < 0.81,
        standardize: standAvg < 0.81,
        discipline: discAvg < 0.81
    };
    
    return `
    <table class="sheet-summary-table maturity-table">
        <thead>
            <tr>
                <th>MATURITY LEVEL</th>
                <th>SORT</th>
                <th>SYSTEMATIZE</th>
                <th>SWEEP</th>
                <th>STANDARDIZE</th>
                <th>SELF-DISCIPLINE</th>
            </tr>
        </thead>
        <tbody>
            <!-- LEVEL 5 -->
            <tr>
                <td><strong>LEVEL 5<br><span style="font-size: 0.9em; font-weight: normal;">Focus on Prevention</span></strong></td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Employees are continually seeking improvement opportunities</span>
                        ${level5.sort ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Anyone can walk into the work area and easily locate items. Abnormal conditions are visually obvious and corrective action measures are in place.</span>
                        ${level5.systematize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Area employees have devised a dependable and documented method of preventive cleaning and maintenance. Work area cleanliness and organization are a way of life.</span>
                        ${level5.sweep ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Employees are continually seeking the elimination of waste, all changes are documented and information is shared with employees.</span>
                        ${level5.standardize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Employees maintain consistent standards in compliance with the 5S program.</span>
                        ${level5.discipline ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
            </tr>
            
            <!-- LEVEL 4 -->
            <tr>
                <td><strong>LEVEL 4<br><span style="font-size: 0.9em; font-weight: normal;">Focus on Consistency</span></strong></td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">A dependable documented method has been established to maintain a work area free of unnecessary items.</span>
                        ${level4.sort ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">A dependable and documented method has been established to recognize, with a visual sweep, if items are out of place or exceed quantity limits.</span>
                        ${level4.systematize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">5S schedules detailing tasks and responsibilities are understood and practiced.</span>
                        ${level4.sweep ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Workplace method improvements are visible and understood by all employees.</span>
                        ${level4.standardize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Checklists exist showing that employees follow through on 5S schedules.</span>
                        ${level4.discipline ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
            </tr>
            
            <!-- LEVEL 3 -->
            <tr>
                <td><strong>LEVEL 3<br><span style="font-size: 0.9em; font-weight: normal;">Make it Visual</span></strong></td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">All unnecessary items have been removed from the work area.</span>
                        ${level3.sort ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Designated locations are marked to make organization more visible.</span>
                        ${level3.systematize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">5S schedules detailing tasks and responsibilities are developed and utilized.</span>
                        ${level3.sweep ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Workplace method improvements are being incorporated and documented.</span>
                        ${level3.standardize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">5S schedules detailing tasks and responsibilities have been developed and are utilized.</span>
                        ${level3.discipline ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
            </tr>
            
            <!-- LEVEL 2 -->
            <tr>
                <td><strong>LEVEL 2<br><span style="font-size: 0.9em; font-weight: normal;">Focus on Basics</span></strong></td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Necessary and unnecessary items are separated.</span>
                        ${level2.sort ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">A designated location has been established for all items.</span>
                        ${level2.systematize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Workplace areas are cleaned on a regularly scheduled basis.</span>
                        ${level2.sweep ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Workplace methods are being improved, but changes have not been documented.</span>
                        ${level2.standardize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">A recognized effort has been made to improve the condition of the work environment.</span>
                        ${level2.discipline ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
            </tr>
            
            <!-- LEVEL 1 -->
            <tr>
                <td><strong>LEVEL 1<br><span style="font-size: 0.9em; font-weight: normal;">Just Beginning</span></strong></td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Necessary and unnecessary items are mixed together in the work area.</span>
                        ${level1.sort ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Tools, supplies, books and materials are randomly located.</span>
                        ${level1.systematize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Workplace areas are dirty and disorganized.</span>
                        ${level1.sweep ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">No attempt is being made to document or improve current processes.</span>
                        ${level1.standardize ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
                <td>
                    <div class="description-with-check">
                        <span class="description-text">Minimal attention is spent on housekeeping.</span>
                        ${level1.discipline ? '<span class="check-mark-right">✓</span>' : ''}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    `;
}

/// Update the function to show total score / max possible
function updateModalTotals() {
    // Get the total average from the main page
    const totalAvgElement = document.getElementById('total-avg');
    const annualRatingElement = document.getElementById('annual-rating');
    
    // Calculate total score and max possible score
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    // Calculate across all quarters
    for (let q = 1; q <= 4; q++) {
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    const score = auditState.quarters[q].scores[question.id] || 0;
                    totalScore += score;
                    maxPossibleScore += question.maxScore; // Usually 4
                });
            });
        });
    }
    
    // Format the total score display
    const totalScoreDisplay = `${totalScore}/${maxPossibleScore}`;
    
    const totalAvg = totalAvgElement ? totalAvgElement.textContent : '0.00';
    const annualRating = annualRatingElement ? annualRatingElement.textContent : 'Not Rated';
    
    // Check if totals section already exists in modal
    const modalBody = document.querySelector('.modal-body');
    if (!modalBody) return;
    
    // Find the maturity table heading (h1)
    const maturityHeading = Array.from(modalBody.querySelectorAll('h1')).find(h1 => 
        h1.textContent.includes('5S MATURITY LEVEL SUMMARY')
    );
    
    // Find the maturity table container
    const maturityTableContainer = document.getElementById('maturity-table-container');
    
    let modalTotalsSection = document.getElementById('modal-totals-section');
    
    if (!modalTotalsSection) {
        // Create new totals section
        modalTotalsSection = document.createElement('div');
        modalTotalsSection.id = 'modal-totals-section';
        modalTotalsSection.className = 'modal-totals-card';
        modalTotalsSection.innerHTML = `
            <div class="totals-header">
                <h4><i class="fas fa-chart-pie"></i> Overall Performance Summary</h4>
            </div>
            <div class="totals-grid">
                <div class="total-item">
                    <div class="total-label">TOTAL AVERAGE SCORE</div>
                    <div class="total-value" id="modal-total-avg">${totalAvg}</div>
                </div>
                <div class="total-item">
                    <div class="total-label">ANNUAL PERFORMANCE</div>
                    <div class="total-value" id="modal-annual-rating">${annualRating}</div>
                </div>
                <div class="total-item">
                    <div class="total-label">TOTAL SCORE</div>
                    <div class="total-value" id="modal-total-score">${totalScoreDisplay}</div>
                </div>
            </div>
            <div class="score-breakdown">
                <span>Total Points: ${totalScore} / ${maxPossibleScore}</span>
            </div>
        `;
        
        // Insert BEFORE the maturity heading
        if (maturityHeading) {
            maturityHeading.parentNode.insertBefore(modalTotalsSection, maturityHeading);
        } 
        // If no heading found but table container exists, insert before table container
        else if (maturityTableContainer) {
            maturityTableContainer.parentNode.insertBefore(modalTotalsSection, maturityTableContainer);
        }
        // Otherwise, append to modal body
        else {
            modalBody.appendChild(modalTotalsSection);
        }
    } else {
        // Update existing totals section
        const modalTotalAvg = document.getElementById('modal-total-avg');
        const modalAnnualRating = document.getElementById('modal-annual-rating');
        const modalTotalScore = document.getElementById('modal-total-score');
        const scoreBreakdown = modalTotalsSection.querySelector('.score-breakdown span');
        
        if (modalTotalAvg) modalTotalAvg.textContent = totalAvg;
        if (modalAnnualRating) modalAnnualRating.textContent = annualRating;
        if (modalTotalScore) modalTotalScore.textContent = totalScoreDisplay;
        if (scoreBreakdown) scoreBreakdown.textContent = `Total Points: ${totalScore} / ${maxPossibleScore}`;
    }
}

// Helper function to extract percentage from text like "4% Complete"
function getPercentageFromText(text) {
    const match = text.match(/(\d+)%/);
    return match ? match[1] : 0;
}

// Function to open Office 5S Action Plan in a new tab
function showOfficeActionPlan() {
    console.log('showOfficeActionPlan called - opening Office 5S Action Plan in new tab');
    
    // Get current values
    const site = auditState.site || '__________________';
    const auditor = auditState.auditor || '_________________';
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Build URL with parameters
    const url = `action-plan.html?site=${encodeURIComponent(site)}&auditor=${encodeURIComponent(auditor)}&date=${encodeURIComponent(date)}`;
    
    // Open in new tab
    window.open(url, '_blank');
}

// Function to generate the HTML for the action plan (EMPTY TABLE)
function generateActionPlanHTML(actionItems) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Office 5S Action Plan</title>
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 30px;
                background: #ffffff;
                color: #2c3e50;
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 4px solid #2c3e50;
                padding: 20px;
            }
            
            .header h1 {
                color: #2c3e50;
                margin-bottom: 15px;
                font-size: 28px;
            }
            
            .header h1 i {
                color: #2c3e50;
                margin-right: 10px;
            }
            
            .header p {
                color: #7f8c8d;
                margin: 5px 0;
                font-size: 14px;
            }
            
            .info-item {
                font-size: 14px;
            }
            
            .info-item strong {
                color: #2c3e50;
                margin-right: 5px;
            }
            
            .table-container {
                overflow-x: auto;
                margin: 25px 0;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
                background: white;
            }
            
            th {
                background: #2c3e50;
                color: white;
                padding: 12px 8px;
                text-align: left;
                font-weight: 600;
                border: 1px solid #34495e;
                white-space: nowrap;
            }
            
            td {
                padding: 12px 8px;
                border: 1px solid #ddd;
                vertical-align: top;
            }
            
            .input-field {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 12px;
                transition: border-color 0.3s;
            }
            
            .input-field:focus {
                outline: none;
                border-color: #3498db;
                box-shadow: 0 0 5px rgba(52,152,219,0.3);
            }
            
            textarea.input-field {
                min-height: 60px;
                resize: vertical;
            }
            
            .footer {
                margin-top: 30px;
                text-align: center;
                color: #7f8c8d;
                font-size: 11px;
                padding: 20px;
                border-top: 2px solid #ecf0f1;
            }
            
            .button-group {
                text-align: right;
                margin-bottom: 20px;
            }
            
            .action-btn {
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                margin-left: 10px;
                margin-bottom: 20px;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s;
            }
            
            .action-btn:hover {
                background: #2980b9;
                transform: translateY(-2px);
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            }
            
            .action-btn.print {
                background: #27ae60;
            }
            
            .action-btn.print:hover {
                background: #229954;
            }
            
            .action-btn.close {
                background: #95a5a6;
            }
            
            .action-btn.close:hover {
                background: #7f8c8d;
            }
            
            .instruction-note {
                background: #fff8e7;
                border-left: 4px solid #f39c12;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
                font-size: 13px;
                color: #2c3e50;
            }
            
            .instruction-note i {
                color: #f39c12;
                margin-right: 8px;
            }
            
            @media print {
                .no-print {
                    display: none;
                }
                body {
                    margin: 0.5in;
                }
                table {
                    break-inside: auto;
                }
                tr {
                    break-inside: avoid;
                }
            }

            .status-legend {
                display: flex;
                justify-content: space-between;
                padding: 12px 20px;
                border-radius: 8px;
                margin: 15px 0 25px 0;
                font-size: 13px;
                flex-wrap: wrap;
                gap: 15px;
            }

            .status-legend span {
                color: #2c3e50;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .status-legend strong {
                color: black;
                margin-right: 5px;
            }   

/* Add circles for each category code */
            .category-circles {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }

            .category-circle {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .category-code {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #3498db;
                color: white;
                font-weight: bold;
                font-size: 12px;
            }

            .category-name {
                font-size: 12px;
                color: #2c3e50;
            }

            .status-btn {
                background-color: white;
                color: black;
                border: 1px solid black;  /* Thin border by default */
                padding: 5px 15px;
                margin: 0 5px;
                cursor: pointer;
                font-weight: normal;
                border-radius: 0;
            }

            .status-btn.thick-border {
                border: 3px solid black;  /* Thick border when selected */
                font-weight: bold;
            }

            .cont-two {
                display: flex;
                flex-direction: row; /* or column */
                gap: 20px; /* Adds space between items */
            }

            .cont-two > * {
                flex: 1;
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 20px;" class="no-print">
            <button class="action-btn print" onclick="window.print()">
                <i class="fas fa-save"></i> Save Action Plan
            </button>
            <button class="action-btn close" onclick="window.close()">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
        
        <div class="header">
            <h1>OFFICE 5S ACTION PLAN</h1>
            <p><strong>Area Audited:</strong> ${auditState.site || '__________________'}</p>
            <p><strong>5S Point Person:</strong> ${auditState.auditor || '_________________'}</p>
            <p><strong>Date:</strong> ${currentDate}</p>
        </div>
        
        <div style="color: black;">
            <strong>There are _ open actions items.
        </div>
        
        <div class="cont-two">
            <span><strong>Status:</strong> 
                <button class="status-btn" id="open-btn">O - Open</button>
                <button class="status-btn" id="closed-btn">C - Closed</button>
            </span>
            <span><strong>Categories:</strong> S1 - Sort, S2 - Systematize, S3 - Sweep, S4 - Standardize, S5 - Self-Discipline</span>
        </div>    

        <div class="table-container">
            <p>Previous Audit</p>
            <table>
                <thead>
                    <tr>
                        <th width="8%">Date of Audit</th>
                        <th width="8%">Ref. Criteria</th>
                        <th width="30%">Description</th>
                        <th width="5%">No. of</th>
                        <th width="5%">Unit/Person</th>
                        <th width="20%">Recommended Action by the</th>
                        <th width="8%">Date</th>
                        <th width="8%">Status</th>
                        <th width="8%">For Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Empty rows for you to fill -->
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                </tbody>
            </table>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button class="action-btn" onclick="addNewRow(this)">
                    <i class="fas fa-plus"></i> Add New Row
                </button>
            </div>
        </div>

        <div class="table-container">
            <p>First Quarter</p>
            <table>
                <thead>
                    <tr>
                        <th width="8%">Date of Audit</th>
                        <th width="8%">Ref. Criteria</th>
                        <th width="30%">Description</th>
                        <th width="5%">No. of</th>
                        <th width="5%">Unit/Person</th>
                        <th width="20%">Recommended Action by the</th>
                        <th width="8%">Date</th>
                        <th width="8%">Status</th>
                        <th width="8%">For Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Empty rows for you to fill -->
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                </tbody>
            </table>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button class="action-btn" onclick="addNewRow(this)">
                    <i class="fas fa-plus"></i> Add New Row
                </button>
            </div>
        </div>

        <div class="table-container">
            <p>Second Quarter</p>
            <table>
                <thead>
                    <tr>
                        <th width="8%">Date of Audit</th>
                        <th width="8%">Ref. Criteria</th>
                        <th width="30%">Description</th>
                        <th width="5%">No. of</th>
                        <th width="5%">Unit/Person</th>
                        <th width="20%">Recommended Action by the</th>
                        <th width="8%">Date</th>
                        <th width="8%">Status</th>
                        <th width="8%">For Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Empty rows for you to fill -->
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                </tbody>
            </table>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button class="action-btn" onclick="addNewRow(this)">
                    <i class="fas fa-plus"></i> Add New Row
                </button>
            </div>
        </div>

        <div class="table-container">
            <p>Third Quarter</p>
            <table>
                <thead>
                    <tr>
                        <th width="8%">Date of Audit</th>
                        <th width="8%">Ref. Criteria</th>
                        <th width="30%">Description</th>
                        <th width="5%">No. of</th>
                        <th width="5%">Unit/Person</th>
                        <th width="20%">Recommended Action by the</th>
                        <th width="8%">Date</th>
                        <th width="8%">Status</th>
                        <th width="8%">For Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Empty rows for you to fill -->
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                </tbody>
            </table>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button class="action-btn" onclick="addNewRow(this)">
                    <i class="fas fa-plus"></i> Add New Row
                </button>
            </div>
        </div>

        <div class="table-container">
            <p>Fourth Quarter</p>
            <table>
                <thead>
                    <tr>
                        <th width="8%">Date of Audit</th>
                        <th width="8%">Ref. Criteria</th>
                        <th width="30%">Description</th>
                        <th width="5%">No. of</th>
                        <th width="5%">Unit/Person</th>
                        <th width="20%">Recommended Action by the</th>
                        <th width="8%">Date</th>
                        <th width="8%">Status</th>
                        <th width="8%">For Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Empty rows for you to fill -->
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                    <tr>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><input type="integer" class="input-field"></td>
                        <td><textarea class="input-field"></textarea></td>
                        <td><input type="date" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                        <td><input type="text" class="input-field"></td>
                    </tr>
                </tbody>
            </table>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button class="action-btn" onclick="addNewRow(this)">
                    <i class="fas fa-plus"></i> Add New Row
                </button>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Office 5S Action Plan</strong> - Fill in the items above to track your 5S improvement activities</p>
            <p>Generated on: ${currentDate}</p>
        </div>
        
        <script>
            // Auto-resize textareas
            document.querySelectorAll('textarea').forEach(textarea => {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
            });
            
            // Status button toggle functionality
            document.addEventListener('DOMContentLoaded', function() {
                const openBtn = document.getElementById('open-btn');
                const closedBtn = document.getElementById('closed-btn');
    
                function setActiveButton(activeButton, inactiveButton) {
        // If the clicked button already has thick border, remove it (toggle off)
                    if (activeButton.classList.contains('thick-border')) {
                        activeButton.classList.remove('thick-border');
                    } else {
            // Otherwise, remove thick border from both, then add to clicked one
                        openBtn.classList.remove('thick-border');
                        closedBtn.classList.remove('thick-border');
                        activeButton.classList.add('thick-border');
                    }
                }
    
                if (openBtn) {
                    openBtn.addEventListener('click', function() {
                        setActiveButton(openBtn, closedBtn);
                    });
                }
    
                if (closedBtn) {
                    closedBtn.addEventListener('click', function() {
                        setActiveButton(closedBtn, openBtn);
                    });
                }
            });

            // Add new row button functionality (optional)
            function addNewRow(button) {
                const tableContainer = button.closest('.table-container');
                const tbody = tableContainer.querySelector('tbody');
    
                const newRow = tbody.insertRow();
                newRow.innerHTML = \`
                    <td><input type="date" class="input-field">\x60
                        <td><input type="text" class="input-field">\x60
                        <td><textarea class="input-field"></textarea>\x60
                        <td><input type="integer" class="input-field">\x60
                        <td><input type="integer" class="input-field">\x60
                        <td><textarea class="input-field"></textarea>\x60
                        <td><input type="date" class="input-field">\x60
                        <td><input type="text" class="input-field">\x60
                        <td><input type="text" class="input-field">\x60
                \`;

                newRow.querySelectorAll('textarea').forEach(textarea => {
                    textarea.addEventListener('input', function() {
                        this.style.height = 'auto';
                        this.style.height = (this.scrollHeight) + 'px';
                    });
                });
            }
        </script>
    </body>
    </html>
    `;
}

// Quarter Navigation Functions
function navigateQuarter(direction) {
    let newQuarter = auditState.currentQuarter;
    
    if (direction === 'prev' && auditState.currentQuarter > 1) {
        newQuarter = auditState.currentQuarter - 1;
    } else if (direction === 'next' && auditState.currentQuarter < 4) {
        newQuarter = auditState.currentQuarter + 1;
    } else {
        // Show message if at boundaries
        if (auditState.currentQuarter === 1 && direction === 'prev') {
            showStatusMessage('Already at First Quarter', 'info');
            return;
        } else if (auditState.currentQuarter === 4 && direction === 'next') {
            showStatusMessage('Already at Fourth Quarter', 'info');
            return;
        }
    }
    
    // Switch to the new quarter
    if (newQuarter !== auditState.currentQuarter) {
        switchQuarter(newQuarter);
        updateQuarterNavDisplay();
        showStatusMessage(`Switched to ${getQuarterName(newQuarter)} Quarter`, 'success');
    }
}

// Update the quarter navigation display
function updateQuarterNavDisplay() {
    const quarterNameElement = document.getElementById('navCurrentQuarter');
    if (quarterNameElement) {
        quarterNameElement.textContent = `${getQuarterName(auditState.currentQuarter)} Quarter`;
    }
}

// Also update the initialize function to set the initial display
function initializeApplication() {
    // Load saved data from localStorage
    loadAuditState();
    
    // Update auditor and year inputs
    const auditorInput = document.getElementById('auditorName');
    const yearInput = document.getElementById('auditYear');
    const siteInput = document.getElementById('department');
    const dateInput = document.getElementById('auditDate');
    
    if (auditorInput) {
        auditorInput.value = auditState.auditor;
        auditorInput.addEventListener('change', function() {
            auditState.auditor = this.value;
            saveAuditState();
        });
    }
    
    if (yearInput) {
        yearInput.value = auditState.year;
        yearInput.addEventListener('change', function() {
            auditState.year = parseInt(this.value);
            saveAuditState();
        });
    }
    
    // Add site input handling
    if (siteInput) {
        siteInput.value = auditState.site || '';
        siteInput.addEventListener('change', function() {
            auditState.site = this.value;
            saveAuditState();
            console.log('Site updated:', auditState.site);
        });
    }
    
    // Add date input handling
    if (dateInput) {
        dateInput.value = auditState.auditDate || new Date().toISOString().split('T')[0];
        dateInput.addEventListener('change', function() {
            auditState.auditDate = this.value;
            // Also update year from date if needed
            if (this.value) {
                const selectedYear = parseInt(this.value.split('-')[0]);
                if (!isNaN(selectedYear)) {
                    auditState.year = selectedYear;
                    if (yearInput) yearInput.value = selectedYear;
                }
            }
            saveAuditState();
            console.log('Date updated:', auditState.auditDate);
        });
    }
    
    // Initialize sheet summary
    updateSheetSummary();
    
    // NEW: Update annual average colors
    setTimeout(updateAnnualAverageColors, 100);
    
    setTimeout(updateMaturityTable, 200);
    
    // NEW: Update quarter navigation display
    setTimeout(updateQuarterNavDisplay, 100);
}

// Comprehensive Export Function - Exports all sheets in one file
function exportCompleteAudit() {
    console.log('exportCompleteAudit called - exporting all sheets');
    
    try {
        // Check if XLSX library is loaded
        if (typeof XLSX === 'undefined' || typeof XLSX.utils === 'undefined') {
            alert('Excel library not loaded. Please refresh the page.');
            return;
        }
        
        // Create new workbook
        const workbook = XLSX.utils.book_new();
        
        // Get the actual date
        const auditDate = auditState.auditDate || new Date().toISOString().split('T')[0];
        const formattedDate = new Date(auditDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // ===== SHEET 1: All Questions & All Quarters =====
        const sheet1Data = generateAllQuestionsSheet(formattedDate);
        const sheet1 = XLSX.utils.aoa_to_sheet(sheet1Data.data);
        sheet1['!cols'] = sheet1Data.columnWidths;
        XLSX.utils.book_append_sheet(workbook, sheet1, "All Questions");
        
        // ===== SHEET 2: Sheet Summary & Maturity Levels =====
        const sheet2Data = generateSummarySheet(formattedDate);
        const sheet2 = XLSX.utils.aoa_to_sheet(sheet2Data.data);
        sheet2['!cols'] = sheet2Data.columnWidths;
        sheet2['!merges'] = sheet2Data.merges || [];
        XLSX.utils.book_append_sheet(workbook, sheet2, "Summary");
        
        // ===== SHEET 3: Photo Evidence =====
        const sheet3Data = generatePhotoEvidenceSheet();
        const sheet3 = XLSX.utils.aoa_to_sheet(sheet3Data.data);
        sheet3['!cols'] = sheet3Data.columnWidths;
        XLSX.utils.book_append_sheet(workbook, sheet3, "Photo Evidence");
        
        // ===== SHEET 4: Action Plan =====
        const sheet4Data = generateActionPlanSheet();
        const sheet4 = XLSX.utils.aoa_to_sheet(sheet4Data.data);
        sheet4['!cols'] = sheet4Data.columnWidths;
        XLSX.utils.book_append_sheet(workbook, sheet4, "Action Plan");
        
        // Generate filename with date and site
        const dateStr = auditDate.replace(/-/g, '');
        const siteSuffix = auditState.site ? `_${auditState.site.replace(/\s+/g, '_')}` : '';
        const filename = `5S_Complete_Audit_${dateStr}${siteSuffix}.xlsx`;
        
        // Save the workbook
        XLSX.writeFile(workbook, filename);
        
        showStatusMessage('Complete audit exported successfully!', 'success');
        
    } catch (error) {
        console.error('Error in exportCompleteAudit:', error);
        alert('Error exporting complete audit: ' + error.message);
    }
}

// ===== SHEET 1: Generate All Questions Data =====
function generateAllQuestionsSheet(formattedDate) {
    const data = [];
    const quarterNames = ['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'];
    
    // Header
    data.push(['5S GOOD HOUSEKEEPING PROGRAM SCORESHEET']);
    data.push(['All Questions & All Quarters Audit Summary']);
    data.push([]);
    data.push(['Auditor:', auditState.auditor || 'Not Specified']);
    data.push(['Audit Site:', auditState.site || 'Not Specified']);
    data.push(['Audit Date:', formattedDate]);
    data.push(['Report Generated:', new Date().toLocaleString()]);
    data.push([]);
    
    // Main table headers - MODIFIED: Question ID to Question #
    data.push([
        'Category', 
        'Sub Category', 
        'Question #', 
        'Question / Criteria', 
        'Q1 Score', 
        'Q2 Score', 
        'Q3 Score', 
        'Q4 Score'
    ]);
    
    // Track current values for grouping
    let lastCategory = '';
    let lastSubcategory = '';
    
    // Add each question - MODIFIED: Use question.title
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            subcat.questions.forEach(question => {
                // Get scores for each quarter
                const q1Score = auditState.quarters[1].scores[question.id] || 0;
                const q2Score = auditState.quarters[2].scores[question.id] || 0;
                const q3Score = auditState.quarters[3].scores[question.id] || 0;
                const q4Score = auditState.quarters[4].scores[question.id] || 0;
                
                // Category display (only if different from last)
                const categoryDisplay = (category.id !== lastCategory) ? category.id : '';
                lastCategory = category.id;
                
                // Subcategory display (only if different from last)
                const subcatDisplay = (subcat.title !== lastSubcategory) ? subcat.title : '';
                lastSubcategory = subcat.title;
                
                data.push([
                    categoryDisplay,
                    subcatDisplay,
                    question.title,
                    question.text,
                    q1Score,
                    q2Score,
                    q3Score,
                    q4Score
                ]);
            });
        });
        lastSubcategory = '';
    });
    
    // Add totals
    data.push([]);
    data.push(['SUMMARY STATISTICS']);
    data.push(['Total Questions:', getTotalQuestionsCount()]);
    data.push(['Max Score per Question:', 4]);
    data.push(['Total Possible Score:', getTotalQuestionsCount() * 4]);
    
    // Calculate totals
    let totalScore = 0;
    for (let q = 1; q <= 4; q++) {
        let quarterTotal = 0;
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    quarterTotal += auditState.quarters[q].scores[question.id] || 0;
                });
            });
        });
        totalScore += quarterTotal;
        data.push([`Q${q} Total:`, quarterTotal]);
    }
    data.push(['Grand Total:', totalScore]);
    
    // Column widths
    const columnWidths = [
        { wch: 15 }, // Category
        { wch: 20 }, // Sub Category
        { wch: 10 }, // Question #
        { wch: 60 }, // Question
        { wch: 8 },  // Q1
        { wch: 8 },  // Q2
        { wch: 8 },  // Q3
        { wch: 8 }   // Q4
    ];
    
    return { data, columnWidths };
}

// ===== SHEET 2: Generate Summary Sheet =====
function generateSummarySheet(formattedDate) {
    const data = [];
    const merges = [];

    
    // Get scores for maturity levels
    const sortAvg = parseFloat(document.getElementById('sort-avg')?.textContent || '0');
    const systAvg = parseFloat(document.getElementById('systematize-avg')?.textContent || '0');
    const sweepAvg = parseFloat(document.getElementById('sweep-avg')?.textContent || '0');
    const standAvg = parseFloat(document.getElementById('standardize-avg')?.textContent || '0');
    const discAvg = parseFloat(document.getElementById('discipline-avg')?.textContent || '0');
    
    
    // ===== QUARTERLY PERFORMANCE =====
    data.push(['QUARTERLY PERFORMANCE SUMMARY']);
    data.push([
        '5S Categories',
        'Q1',
        'Q2',
        'Q3',
        'Q4',
        'Annual Average'
    ]);
    
    // Get values from the sheet summary
    const sortQ1 = document.getElementById('sort-q1')?.textContent || '0.00';
    const sortQ2 = document.getElementById('sort-q2')?.textContent || '0.00';
    const sortQ3 = document.getElementById('sort-q3')?.textContent || '0.00';
    const sortQ4 = document.getElementById('sort-q4')?.textContent || '0.00';
    
    const systQ1 = document.getElementById('systematize-q1')?.textContent || '0.00';
    const systQ2 = document.getElementById('systematize-q2')?.textContent || '0.00';
    const systQ3 = document.getElementById('systematize-q3')?.textContent || '0.00';
    const systQ4 = document.getElementById('systematize-q4')?.textContent || '0.00';
    
    const sweepQ1 = document.getElementById('sweep-q1')?.textContent || '0.00';
    const sweepQ2 = document.getElementById('sweep-q2')?.textContent || '0.00';
    const sweepQ3 = document.getElementById('sweep-q3')?.textContent || '0.00';
    const sweepQ4 = document.getElementById('sweep-q4')?.textContent || '0.00';
    
    const standQ1 = document.getElementById('standardize-q1')?.textContent || '0.00';
    const standQ2 = document.getElementById('standardize-q2')?.textContent || '0.00';
    const standQ3 = document.getElementById('standardize-q3')?.textContent || '0.00';
    const standQ4 = document.getElementById('standardize-q4')?.textContent || '0.00';
    
    const discQ1 = document.getElementById('discipline-q1')?.textContent || '0.00';
    const discQ2 = document.getElementById('discipline-q2')?.textContent || '0.00';
    const discQ3 = document.getElementById('discipline-q3')?.textContent || '0.00';
    const discQ4 = document.getElementById('discipline-q4')?.textContent || '0.00';
    
    const totalQ1 = document.getElementById('total-q1')?.textContent || '0.00';
    const totalQ2 = document.getElementById('total-q2')?.textContent || '0.00';
    const totalQ3 = document.getElementById('total-q3')?.textContent || '0.00';
    const totalQ4 = document.getElementById('total-q4')?.textContent || '0.00';
    
    // Add rows
    data.push(['Sort (Seiri)', sortQ1, sortQ2, sortQ3, sortQ4, sortAvg.toFixed(2)]);
    data.push(['Systematize (Seiton)', systQ1, systQ2, systQ3, systQ4, systAvg.toFixed(2)]);
    data.push(['Sweep (Seiso)', sweepQ1, sweepQ2, sweepQ3, sweepQ4, sweepAvg.toFixed(2)]);
    data.push(['Standardize (Seiketsu)', standQ1, standQ2, standQ3, standQ4, standAvg.toFixed(2)]);
    data.push(['Self-Discipline (Shitsuke)', discQ1, discQ2, discQ3, discQ4, discAvg.toFixed(2)]);
    data.push(['TOTAL AVERAGE SCORE', totalQ1, totalQ2, totalQ3, totalQ4, document.getElementById('total-avg')?.textContent || '0.00']);
    data.push([]);
    data.push(['Annual Rating:', document.getElementById('annual-rating')?.textContent || 'Not Rated']);
    data.push(['Completion:', document.getElementById('completion-percentage')?.textContent || '0% Complete']);
    data.push([]);
    data.push([]);

    // ===== SCORING SUMMARY =====
    data.push(['5S SCORING SUMMARY']);
    data.push(['Category', 'Annual Average', 'Achieved Level']);
    data.push(['Sort (S1)', sortAvg.toFixed(2), getMaturityLevel(sortAvg)]);
    data.push(['Systematize (S2)', systAvg.toFixed(2), getMaturityLevel(systAvg)]);
    data.push(['Sweep (S3)', sweepAvg.toFixed(2), getMaturityLevel(sweepAvg)]);
    data.push(['Standardize (S4)', standAvg.toFixed(2), getMaturityLevel(standAvg)]);
    data.push(['Self-Discipline (S5)', discAvg.toFixed(2), getMaturityLevel(discAvg)]);
    data.push([]);
    data.push([]);
    // ===== MATURITY LEVEL SUMMARY =====
    data.push(['5S MATURITY LEVEL SUMMARY - ACHIEVED LEVELS']);
    
    // Maturity table headers
    data.push([
        'MATURITY LEVEL',
        'SORT (S1)',
        'SYSTEMATIZE (S2)',
        'SWEEP (S3)',
        'STANDARDIZE (S4)',
        'SELF-DISCIPLINE (S5)'
    ]);
    
    // Level 5
    data.push([
        'LEVEL 5 - Focus on Prevention',
        (sortAvg >= 3.21) ? '✓ Employees are continually seeking improvement opportunities' : 'Employees are continually seeking improvement opportunities',
        (systAvg >= 3.21) ? '✓ Anyone can walk into the work area and easily locate items. Abnormal conditions are visually obvious and corrective action measures are in place.' : 'Anyone can walk into the work area and easily locate items. Abnormal conditions are visually obvious and corrective action measures are in place.',
        (sweepAvg >= 3.21) ? '✓ Area employees have devised a dependable and documented method of preventive cleaning and maintenance. Work area cleanliness and organization are a way of life.' : 'Area employees have devised a dependable and documented method of preventive cleaning and maintenance. Work area cleanliness and organization are a way of life.',
        (standAvg >= 3.21) ? '✓ Employees are continually seeking the elimination of waste, all changes are documented and information is shared with employees.' : 'Employees are continually seeking the elimination of waste, all changes are documented and information is shared with employees.',
        (discAvg >= 3.21) ? '✓ Employees maintain consistent standards in compliance with the 5S program.' : 'Employees maintain consistent standards in compliance with the 5S program.'
    ]);
    
    // Level 4
    data.push([
        'LEVEL 4 - Focus on Consistency',
        (sortAvg >= 2.41 && sortAvg < 3.21) ? '✓ A dependable documented method has been established to maintain a work area free of unnecessary items.' : 'A dependable documented method has been established to maintain a work area free of unnecessary items.',
        (systAvg >= 2.41 && systAvg < 3.21) ? '✓ A dependable and documented method has been established to recognize, with a visual sweep, if items are out of place or exceed quantity limits.' : 'A dependable and documented method has been established to recognize, with a visual sweep, if items are out of place or exceed quantity limits.',
        (sweepAvg >= 2.41 && sweepAvg < 3.21) ? '✓ 5S schedules detailing tasks and responsibilities are understood and practiced.' : '5S schedules detailing tasks and responsibilities are understood and practiced.',
        (standAvg >= 2.41 && standAvg < 3.21) ? '✓ Workplace method improvements are visible and understood by all employees.' : 'Workplace method improvements are visible and understood by all employees.',
        (discAvg >= 2.41 && discAvg < 3.21) ? '✓ Checklists exist showing that employees follow through on 5S schedules.' : 'Checklists exist showing that employees follow through on 5S schedules.'
    ]);
    
    // Level 3
    data.push([
        'LEVEL 3 - Make it Visual',
        (sortAvg >= 1.61 && sortAvg < 2.41) ? '✓ All unnecessary items have been removed from the work area.' : 'All unnecessary items have been removed from the work area.',
        (systAvg >= 1.61 && systAvg < 2.41) ? '✓ Designated locations are marked to make organization more visible.' : 'Designated locations are marked to make organization more visible.',
        (sweepAvg >= 1.61 && sweepAvg < 2.41) ? '✓ 5S schedules detailing tasks and responsibilities are developed and utilized.' : '5S schedules detailing tasks and responsibilities are developed and utilized.',
        (standAvg >= 1.61 && standAvg < 2.41) ? '✓ Workplace method improvements are being incorporated and documented.' : 'Workplace method improvements are being incorporated and documented.',
        (discAvg >= 1.61 && discAvg < 2.41) ? '✓ 5S schedules detailing tasks and responsibilities have been developed and are utilized.' : '5S schedules detailing tasks and responsibilities have been developed and are utilized.'
    ]);
    
    // Level 2
    data.push([
        'LEVEL 2 - Focus on Basics',
        (sortAvg >= 0.81 && sortAvg < 1.61) ? '✓ Necessary and unnecessary items are separated.' : 'Necessary and unnecessary items are separated.',
        (systAvg >= 0.81 && systAvg < 1.61) ? '✓ A designated location has been established for all items.' : 'A designated location has been established for all items.',
        (sweepAvg >= 0.81 && sweepAvg < 1.61) ? '✓ Workplace areas are cleaned on a regularly scheduled basis.' : 'Workplace areas are cleaned on a regularly scheduled basis.',
        (standAvg >= 0.81 && standAvg < 1.61) ? '✓ Workplace methods are being improved, but changes have not been documented.' : 'Workplace methods are being improved, but changes have not been documented.',
        (discAvg >= 0.81 && discAvg < 1.61) ? '✓ A recognized effort has been made to improve the condition of the work environment.' : 'A recognized effort has been made to improve the condition of the work environment.'
    ]);
    
    // Level 1
    data.push([
        'LEVEL 1 - Just Beginning',
        (sortAvg < 0.81) ? '✓ Necessary and unnecessary items are mixed together in the work area.' : 'Necessary and unnecessary items are mixed together in the work area.',
        (systAvg < 0.81) ? '✓ Tools, supplies, books and materials are randomly located.' : 'Tools, supplies, books and materials are randomly located.',
        (sweepAvg < 0.81) ? '✓ Workplace areas are dirty and disorganized.' : 'Workplace areas are dirty and disorganized.',
        (standAvg < 0.81) ? '✓ No attempt is being made to document or improve current processes.' : 'No attempt is being made to document or improve current processes.',
        (discAvg < 0.81) ? '✓ Minimal attention is spent on housekeeping.' : 'Minimal attention is spent on housekeeping.'
    ]);

    // Column widths
    const columnWidths = [
        { wch: 30 }, // Maturity Level / Category
        { wch: 60 }, // Sort / Q1
        { wch: 60 }, // Systematize / Q2
        { wch: 60 }, // Sweep / Q3
        { wch: 60 }, // Standardize / Q4
        { wch: 60 }  // Self-Discipline / Annual Average
    ];
    
    return { data, columnWidths, merges };
}

// ===== SHEET 3: Generate Photo Evidence Sheet (UPDATED - TWO COLUMNS) =====
function generatePhotoEvidenceSheet() {
    const data = [];
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    
    // Collect all photos and group by category
    const photoData = [];
    
    for (let q = 1; q <= 4; q++) {
        const quarterPhotos = auditState.quarters[q].photos || [];
        
        quarterPhotos.forEach(photo => {
            let questionDetails = null;
            let categoryInfo = null;
            
            for (const category of questionsData) {
                for (const subcat of category.subcategories) {
                    const question = subcat.questions.find(q => q.id === photo.questionId);
                    if (question) {
                        questionDetails = question;
                        categoryInfo = {
                            category: category,
                            subcategory: subcat
                        };
                        break;
                    }
                }
                if (questionDetails) break;
            }
            
            if (questionDetails && categoryInfo) {
                photoData.push({
                    quarter: q,
                    category: categoryInfo.category,
                    subcategory: categoryInfo.subcategory,
                    question: questionDetails,
                    photo: photo
                });
            }
        });
    }
    
    // Sort by category
    photoData.sort((a, b) => {
        if (a.category.id !== b.category.id) return a.category.id.localeCompare(b.category.id);
        return a.question.id.localeCompare(b.question.id);
    });
    
    // Group by category
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) {
            grouped[catId] = {
                category: item.category,
                items: []
            };
        }
        grouped[catId].items.push(item);
    });
    
    // Add data for each category with TWO COLUMN format
    Object.keys(grouped).forEach(catId => {
        const group = grouped[catId];
        const category = group.category;
        
        // Add category header
        data.push([`${category.id} - ${category.title}`]);
        data.push([`Total: ${group.items.length} photo(s)`]);
        data.push([]);
        
        // Add TWO COLUMN headers
        data.push(['PHOTO EVIDENCE', 'DETAILS / REMARKS']);
        
        // Add rows for each photo in this category - MODIFIED: Use question.title
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            const comment = auditState.quarters[item.quarter].comments?.[item.question.id] || '';
            
            // Create photo information string
            const photoInfo = `File: ${item.photo.fileName}\nQuestion: ${item.question.title}\nQuarter: ${quarterName}`;
            
            // Create details string with question text and comments
            const detailsText = `Question: ${item.question.text}\n\nRemarks: ${comment || 'No remarks added'}`;
            
            // Add row with two columns
            data.push([photoInfo, detailsText]);
        });
        
        // Add empty row between categories
        data.push([]);
        data.push([]);
    });
    
    
    // Column widths - adjusted for two columns
    const columnWidths = [
        { wch: 50 }, // Photo Evidence column (wider for file info)
        { wch: 80 }  // Details/Remarks column (much wider for question text and remarks)
    ];
    
    return { data, columnWidths };
}

// Helper function to get total photo count
function getTotalPhotoCount() {
    let count = 0;
    for (let q = 1; q <= 4; q++) {
        count += (auditState.quarters[q].photos || []).length;
    }
    return count;
}

// ===== SHEET 4: Generate Action Plan Sheet (UPDATED - WITH ACTUAL DATA) =====
function generateActionPlanSheet() {
    const data = [];
    
    // Count open items
    const openCount = countOpenItemsFromActionPlan();

    // Categories legend
    data.push(['Status: O - Open | C - Closed']);
    data.push(['Categories: S1 - Sort, S2 - Systematize, S3 - Sweep, S4 - Standardize, S5 - Self-Discipline']);
    data.push([`There are ${openCount} open action items.`]);
    data.push([]);
    data.push([]);
    
    // Try to get data from localStorage first (if action plan was saved)
    let actionPlanData = null;
    try {
        const savedData = localStorage.getItem('currentActionPlan');
        if (savedData) {
            actionPlanData = JSON.parse(savedData);
            console.log('Loaded action plan data from localStorage');
        }
    } catch (error) {
        console.error('Error loading action plan data:', error);
    }
    
    // Define table sections
    const tableSections = ['PREVIOUS AUDIT', 'FIRST QUARTER', 'SECOND QUARTER', 'THIRD QUARTER', 'FOURTH QUARTER'];
    
    // If we have saved data, use it to populate the tables
    if (actionPlanData && actionPlanData.tables) {
        console.log('Using saved action plan data with', actionPlanData.tables.length, 'tables');
        
        actionPlanData.tables.forEach((tableData, index) => {
            if (index < tableSections.length) {
                // Add table title
                data.push([tableSections[index]]);
                
                // Add headers
                data.push([
                    'Date of Audit',
                    'Ref. Criteria',
                    'Description',
                    'No. of',
                    'Unit/Person',
                    'Recommended Action',
                    'Target Date',
                    'Status',
                    'For Action'
                ]);
                
                // Add rows from saved data
                if (tableData.rows && tableData.rows.length > 0) {
                    tableData.rows.forEach(rowData => {
                        const row = [];
                        // Process each cell in the row
                        rowData.forEach(cellData => {
                            if (cellData.type === 'select') {
                                // For status dropdown, show O or C
                                row.push(cellData.value === 'open' ? 'O' : cellData.value === 'close' ? 'C' : '');
                            } else if (cellData.type === 'date' && cellData.value) {
                                // Format date to dd/mm/yyyy
                                try {
                                    const date = new Date(cellData.value);
                                    const day = date.getDate().toString().padStart(2, '0');
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    const year = date.getFullYear();
                                    row.push(`${day}/${month}/${year}`);
                                } catch (e) {
                                    row.push(cellData.value || '');
                                }
                            } else {
                                row.push(cellData.value || '');
                            }
                        });
                        data.push(row);
                    });
                } else {
                    // Add 3 empty rows if no data
                    for (let i = 0; i < 3; i++) {
                        data.push(['', '', '', '', '', '', '', '', '']);
                    }
                }
                data.push([]);
            }
        });
    } else {
        // Fallback to empty tables if no saved data
        console.log('No saved action plan data, using empty tables');
        
        tableSections.forEach(section => {
            data.push([section]);
            data.push([]);
            data.push([
                'Date of Audit',
                'Ref. Criteria',
                'Description',
                'No. of',
                'Unit/Person',
                'Recommended Action',
                'Target Date',
                'Status',
                'For Action'
            ]);
            
            // Add 3 empty rows
            for (let i = 0; i < 3; i++) {
                data.push(['', '', '', '', '', '', '', '', '']);
            }
            data.push([]);
        });
    }
    
    const columnWidths = [
        { wch: 15 }, // Date of Audit
        { wch: 15 }, // Ref. Criteria
        { wch: 40 }, // Description
        { wch: 10 }, // No. of
        { wch: 15 }, // Unit/Person
        { wch: 40 }, // Recommended Action
        { wch: 15 }, // Target Date
        { wch: 10 }, // Status
        { wch: 15 }  // For Action
    ];
    
    return { data, columnWidths };
}

// Helper function to count open items from action plan data
function countOpenItemsFromActionPlan() {
    let openCount = 0;
    
    try {
        const savedData = localStorage.getItem('currentActionPlan');
        if (savedData) {
            const actionPlanData = JSON.parse(savedData);
            
            if (actionPlanData.tables) {
                actionPlanData.tables.forEach(table => {
                    if (table.rows) {
                        table.rows.forEach(row => {
                            // Status is typically the 8th column (index 7)
                            if (row[7] && row[7].value === 'open') {
                                openCount++;
                            }
                        });
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error counting open items:', error);
    }
    
    return openCount;
}

// Helper function to get maturity level from score
function getMaturityLevel(score) {
    if (score >= 3.21) return 'Level 5 - Focus on Prevention';
    if (score >= 2.41) return 'Level 4 - Focus on Consistency';
    if (score >= 1.61) return 'Level 3 - Make it Visual';
    if (score >= 0.81) return 'Level 2 - Focus on Basics';
    return 'Level 1 - Just Beginning';
}

// Comprehensive Print Function - Opens print preview window with Print and Download PDF buttons
function exportAuditResults(type) {
    console.log('exportAuditResults called with type:', type);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get current date for the report
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Get audit information
    const auditor = auditState.auditor || 'Not Specified';
    const site = auditState.site || 'DOST Office';
    const auditDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not Set';
    
    // Generate the complete HTML for printing
    const printHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>5S Audit Complete Report</title>
        <style>
            /* General Print Styles - Font sizes reduced by 3pt overall */
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: white;
                color: #2c3e50;
                line-height: 1.4;
                font-size: 9pt;
            }
            
            /* Button Container Styles */
            .button-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                gap: 10px;
                background: white;
                padding: 8px 12px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                border: 1px solid #ddd;
            }
            
            .action-button {
                padding: 6px 12px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 10pt;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 6px;
                transition: all 0.2s;
            }
            
            .action-button.print {
                background: #3498db;
                color: white;
            }
            
            .action-button.print:hover {
                background: #2980b9;
            }
            
            .action-button.pdf {
                background: #e74c3c;
                color: white;
            }
            
            .action-button.pdf:hover {
                background: #c0392b;
            }
            
            @media print {
                .button-container {
                    display: none;
                }
            }
            
            .page {
                page-break-after: always;
                padding: 0.5in 0.5in;
                min-height: 100vh;
                position: relative;
            }
            
            .page:last-child {
                page-break-after: auto;
            }
            
            /* Header Styles */
            .report-header {
                text-align: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #3498db;
            }
            
            .report-header h1 {
                color: #2c3e50;
                font-size: 17pt;
                margin-bottom: 8px;
            }
            
            .report-header h1 i {
                color: #3498db;
                margin-right: 8px;
            }
            
            .report-header h2 {
                color: #7f8c8d;
                font-size: 12pt;
                font-weight: normal;
            }
            
            /* Audit Info Section - 3 points smaller */
            .audit-info-section {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin: 12px 0 20px;
                padding: 12px;
                background: #f8f9fa;
                border-radius: 6px;
                border: 1px solid #dee2e6;
            }
            
            .audit-info-item {
                flex: 1 1 160px;
                display: flex;
                flex-direction: column;
            }
            
            .info-label {
                font-size: 7pt;
                font-weight: 600;
                color: #6c757d;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 3px;
            }
            
            .info-value {
                font-size: 9pt;
                font-weight: 500;
                color: #2c3e50;
            }
            
            /* Table Styles */
            .table-container {
                margin: 18px 0;
                overflow-x: auto;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 8pt;
                border: 1px solid #dee2e6;
            }
            
            th {
                background: #34495e;
                color: white;
                padding: 7px 5px;
                text-align: left;
                font-weight: 600;
                font-size: 8pt;
                border: 1px solid #2c3e50;
            }
            
            td {
                padding: 5px;
                border: 1px solid #dee2e6;
                vertical-align: top;
                font-size: 8pt;
            }
            
            /* Summary Table Styles */
            .sheet-summary-table {
                width: 100%;
                border-collapse: collapse;
                margin: 12px 0;
            }
            
            .sheet-summary-table th {
                background: #34495e;
                color: white;
                padding: 7px;
                text-align: center;
                font-size: 8pt;
            }
            
            .sheet-summary-table td {
                padding: 7px;
                text-align: center;
                font-size: 8pt;
            }
            
            .sheet-summary-table td:first-child {
                text-align: left;
                font-weight: 500;
            }
            
            .category-name {
                font-weight: 600;
                color: #2c3e50;
                font-size: 8pt;
            }
            
            .category-name i {
                margin-right: 5px;
                color: #3498db;
            }
            
            .total-row {
                background: #f8f9fa;
                font-weight: bold;
            }
            
            .status-row {
                background: #e9ecef;
            }
            
            .status-badge {
                display: inline-block;
                padding: 2px 8px;
                border-radius: 14px;
                font-size: 7pt;
                font-weight: 600;
            }
            
            .not-started {
                background: #e74c3c;
                color: white;
            }
            
            .in-progress {
                background: #f39c12;
                color: white;
            }
            
            .completed {
                background: #27ae60;
                color: white;
            }
            
            /* Maturity Table Styles */
            .maturity-table {
                margin-top: 20px;
            }
            
            .maturity-table th {
                font-size: 7pt;
                padding: 5px;
            }
            
            .maturity-table td {
                vertical-align: middle;
                font-size: 7pt;
                line-height: 1.3;
                padding: 5px;
            }
            
            .description-with-check {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 6px;
            }
            
            .check-mark-right {
                color: #27ae60;
                font-weight: bold;
                font-size: 10pt;
                min-width: 16px;
                text-align: right;
            }
            
            /* Summary Footer */
            .summary-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 12px;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 5px;
            }
            
            .completion-info {
                flex: 1;
                font-size: 8pt;
            }
            
            .completion-bar {
                height: 6px;
                background: #e9ecef;
                border-radius: 3px;
                margin-top: 3px;
                width: 160px;
            }
            
            .completion-fill {
                height: 6px;
                background: #3498db;
                border-radius: 3px;
            }
            
            .annual-info {
                font-size: 9pt;
                font-weight: 600;
            }
            
            #annual-rating {
                color: #27ae60;
            }
            
            /* Photo Evidence Styles */
            .photo-category {
                margin: 20px 0;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                overflow: hidden;
            }
            
            .photo-category-header {
                background: #34495e;
                color: white;
                padding: 8px 10px;
                font-weight: bold;
                font-size: 9pt;
                display: flex;
                justify-content: space-between;
                align-items: center;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            .photo-table {
                width: 100%;
                border-collapse: collapse;
            }
            
            .photo-table th {
                background: #ecf0f1;
                color: #2c3e50;
                font-weight: 600;
                font-size: 8pt;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            .photo-table td {
                padding: 8px;
                vertical-align: top;
                font-size: 8pt;
            }
            
            .photo-cell {
                width: 50%;
                text-align: center;
            }
            
            .photo-cell img {
                max-width: 160px;
                max-height: 120px;
                object-fit: contain;
                border: 2px solid #dee2e6;
                border-radius: 4px;
            }
            
            .photo-filename {
                font-size: 7pt;
                color: #7f8c8d;
                margin-top: 3px;
            }
            
            .details-cell {
                width: 50%;
                background: #f8f9fa;
                font-size: 8pt;
            }
            
            .details-text {
                color: #2c3e50;
                line-height: 1.4;
            }
            
            .details-meta {
                font-size: 7pt;
                color: #7f8c8d;
                margin-top: 6px;
                padding-top: 6px;
                border-top: 1px dashed #dee2e6;
            }
            
            /* Action Plan Styles */
            .action-plan-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 7pt;
                margin: 10px 0;
            }
            
            .action-plan-table th {
                background: #34495e;
                color: white;
                padding: 4px 3px;
                text-align: center;
                font-size: 7pt;
            }
            
            .action-plan-table td {
                padding: 4px 3px;
                border: 1px solid #dee2e6;
                font-size: 7pt;
            }
            
            .section-title {
                background: #ecf0f1;
                padding: 6px;
                margin: 12px 0 6px;
                font-weight: bold;
                font-size: 9pt;
                border-left: 4px solid #3498db;
            }
            
            .signature-section {
                margin-top: 35px;
                padding-top: 20px;
            }
            
            .signature-label {
                font-size: 10px;
                color: #7f8c8d;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-top: 5px;
            }
            
            .signature-line {
                font-family: 'Courier New', monospace;
                font-size: 18px;
                letter-spacing: 1px;
                border-bottom: 1px solid #2c3e50;
                width: 250px;
                margin: 5px 0;
            }
            
            .signature-role {
                font-size: 8pt;
                color: #7f8c8d;
            }
            
            /* Scoring Summary */
            .scoring-summary {
                margin: 20px 0;
            }
            
            .scoring-summary h3 {
                font-size: 11pt;
            }
            
            .scoring-summary table {
                width: 60%;
                margin: 0 auto;
                font-size: 8pt;
            }
            
            .scoring-summary td {
                padding: 5px 10px;
                font-size: 8pt;
            }
            
            /* Page Footer */
            .page-footer {
                position: absolute;
                bottom: 20px;
                right: 20px;
                font-size: 7pt;
                color: #95a5a6;
            }
            
            /* Audit Remarks & Signature Print Styles */
            .audit-remarks-print {
                margin-top: 30px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #3498db;
            }
            
            .signature-print {
                margin-top: 30px;
                padding: 20px 15px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                flex-wrap: wrap;
                gap: 20px;
            }

            .signature-printed {
                margin-top: 8px;
                font-size: 12px;
            }

            .signature-printed strong {
                color: #2c3e50;
                font-weight: 600;
            }

            .signature-left {
                flex: 1;
            }
            
            .previous-auditors-print {
                margin-top: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
            }
            
            .previous-auditors-print table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            
            .previous-auditors-print th,
            .previous-auditors-print td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            
            .previous-auditors-print th {
                background: #ecf0f1;
            }
            
            /* Print-specific adjustments */
            @media print {
                @page {
                    size: 8.5in 13in;
                    margin: 0.5in;
                }

                .photo-category-header {
                    background: #34495e !important;
                    color: white !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
    
                .photo-table th {
                    background: #ecf0f1 !important;
                    color: #2c3e50 !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
    
    /* Make sure category title text is readable */
                .category-title {
                    background: #34495e !important;
                    color: white !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
    
                /* Ensure all backgrounds print */
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                
                body {
                    background: white;
                    font-size: 8pt;
                }
                
                .page {
                    padding: 0.2in;
                }
                
                .report-header {
                    margin-bottom: 12px;
                }
                
                .report-header h1 {
                    font-size: 15pt;
                }
                
                .report-header h2 {
                    font-size: 11pt;
                }
                
                .audit-info-section {
                    background: none;
                    border: 1px solid #000;
                }
                
                .info-label {
                    font-size: 6pt;
                }
                
                .info-value {
                    font-size: 8pt;
                }
                
                th {
                    background: #34495e !important;
                    color: white !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .status-badge {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .photo-category-header {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                
                .check-mark-right {
                    color: #27ae60 !important;
                }
                
                table, th, td {
                    font-size: 7pt;
                }
                
                /* Print-specific styles for remarks sections */
                .audit-remarks-print {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                .signature-print {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
                
                .previous-auditors-print {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body>
        <!-- Button Container -->
        <div class="button-container no-print">
            <button class="action-button print" onclick="window.print()">
                <i class="fas fa-print"></i> Print or Save Report
            </button>
            <!--<button class="action-button pdf" id="pdfDownloadBtn">
                <i class="fas fa-file-pdf"></i> Save as PDF
            </button>-->
        </div>
        
        ${generatePage1(auditor, site, auditDate, currentDate)}
        ${generatePage2()}
        ${generatePage3(auditor, site, auditDate, currentDate)}
        ${generatePage4()}
        
        <script>
            document.getElementById('pdfDownloadBtn').addEventListener('click', function() {
                // Add PDF page size style if not already present
                let pdfStyle = document.getElementById('pdf-page-style');
                if (!pdfStyle) {
                    pdfStyle = document.createElement('style');
                    pdfStyle.id = 'pdf-page-style';
                    pdfStyle.textContent = \`
                        @page {
                            size: 8.5in 13in;
                            margin: 0.5in;
                        }
                    \`;
                    document.head.appendChild(pdfStyle);
                }
                
                // Trigger print
                window.print();
            });
        </script>
    </body>
    </html>
    `;
    
    printWindow.document.write(printHTML);
    printWindow.document.close();
}

// PAGE 1: All Questions & All Quarters - MODIFIED: Use question.title
function generatePage1(auditor, site, auditDate, currentDate) {
    // Load saved remarks data
    let remarksData = null;
    let remarks = '';
    let signature = '';
    let signatureDate = '';
    let quarterAuditors = {
        Q1: '', Q1Date: '',
        Q2: '', Q2Date: '',
        Q3: '', Q3Date: '',
        Q4: '', Q4Date: ''
    };
    
    try {
        const savedRemarks = localStorage.getItem('auditRemarksData');
        if (savedRemarks) {
            remarksData = JSON.parse(savedRemarks);
            remarks = remarksData.remarks || '';
            signature = remarksData.signature || '';
            signatureDate = remarksData.signatureDate || '';
            if (remarksData.quarterAuditors) {
                quarterAuditors = remarksData.quarterAuditors;
            }
        }
    } catch (error) {
        console.error('Error loading remarks data for print:', error);
    }
    
    return `
    <div class="page">
        <div class="report-header">
            <h1><i class="fas fa-table"></i> 5S AUDIT SUMMARY</h1>
            <h2>All Questions & All Quarters</h2>
        </div>
        
        <div class="audit-info-section">
            <div class="audit-info-item">
                <span class="info-label">Auditor:</span>
                <span class="info-value">${auditor}</span>
            </div>
            <div class="audit-info-item">
                <span class="info-label">Audit Date:</span>
                <span class="info-value">${auditDate}</span>
            </div>
            <div class="audit-info-item">
                <span class="info-label">Audit Site:</span>
                <span class="info-value">${site}</span>
            </div>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Q#</th>
                        <th>Question / Criteria</th>
                        <th>Q1</th>
                        <th>Q2</th>
                        <th>Q3</th>
                        <th>Q4</th>
                    </tr>
                </thead>
                <tbody>
                    ${generateAllQuestionsRows()}
                </tbody>
            </table>
        </div>
        
        <!-- Audit Remarks Section -->
        ${remarks ? `
        <div class="audit-remarks-print" style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3498db;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50;"><i class="fas fa-comment-dots"></i> Audit Remarks / Findings</h3>
            <p style="margin: 0; line-height: 1.5; white-space: pre-wrap;">${remarks.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        <!-- Auditor Signature Section -->
        <div class="signature-print" style="margin-top: 20px; padding: 15px; border-top: 1px solid #ddd;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div class="signature-left">
                    <br>
                    <div class="signature-line"></div>
                    <div class="signature-label">Signature of Auditor</div>
                    ${signature ? `<div style="margin-top: 5px;"><strong>Printed Name:</strong> ${signature}</div>` : ''}
                </div>
                <div>
                    <br>
                    <div style="font-size: 14px;"><strong>Date:</strong></div>
                </div>
            </div>
        </div>
        
        <!-- Previous Auditors Section -->
        <div class="previous-auditors-print" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50;"><i class="fas fa-users"></i> Previous Auditors / Reviewers</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr style="background: #ecf0f1;">
                        <th style="background: #2c3e50; width: 20%; padding: 8px; text-align: left; border: 1px solid #ddd;">Quarter</th>
                        <th style="background: #2c3e50; width: 50%; padding: 8px; text-align: left; border: 1px solid #ddd;">Auditor Name</th>
                        <th style="background: #2c3e50; width: 30%; padding: 8px; text-align: left; border: 1px solid #ddd;">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Q1</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q1 || '—'}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q1Date ? new Date(quarterAuditors.Q1Date).toLocaleDateString() : '—'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Q2</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q2 || '—'}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q2Date ? new Date(quarterAuditors.Q2Date).toLocaleDateString() : '—'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Q3</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q3 || '—'}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q3Date ? new Date(quarterAuditors.Q3Date).toLocaleDateString() : '—'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;"><strong>Q4</strong></td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q4 || '—'}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${quarterAuditors.Q4Date ? new Date(quarterAuditors.Q4Date).toLocaleDateString() : '—'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="page-footer">
            Page 1 of 4
        </div>
    </div>
    `;
}

// PAGE 2: Sheet Summary & Maturity Levels
function generatePage2() {
    // Get all values from the DOM
    const sortQ1 = document.getElementById('sort-q1')?.textContent || '0.00';
    const sortQ2 = document.getElementById('sort-q2')?.textContent || '0.00';
    const sortQ3 = document.getElementById('sort-q3')?.textContent || '0.00';
    const sortQ4 = document.getElementById('sort-q4')?.textContent || '0.00';
    const sortAvg = document.getElementById('sort-avg')?.textContent || '0.00';
    
    const systQ1 = document.getElementById('systematize-q1')?.textContent || '0.00';
    const systQ2 = document.getElementById('systematize-q2')?.textContent || '0.00';
    const systQ3 = document.getElementById('systematize-q3')?.textContent || '0.00';
    const systQ4 = document.getElementById('systematize-q4')?.textContent || '0.00';
    const systAvg = document.getElementById('systematize-avg')?.textContent || '0.00';
    
    const sweepQ1 = document.getElementById('sweep-q1')?.textContent || '0.00';
    const sweepQ2 = document.getElementById('sweep-q2')?.textContent || '0.00';
    const sweepQ3 = document.getElementById('sweep-q3')?.textContent || '0.00';
    const sweepQ4 = document.getElementById('sweep-q4')?.textContent || '0.00';
    const sweepAvg = document.getElementById('sweep-avg')?.textContent || '0.00';
    
    const standQ1 = document.getElementById('standardize-q1')?.textContent || '0.00';
    const standQ2 = document.getElementById('standardize-q2')?.textContent || '0.00';
    const standQ3 = document.getElementById('standardize-q3')?.textContent || '0.00';
    const standQ4 = document.getElementById('standardize-q4')?.textContent || '0.00';
    const standAvg = document.getElementById('standardize-avg')?.textContent || '0.00';
    
    const discQ1 = document.getElementById('discipline-q1')?.textContent || '0.00';
    const discQ2 = document.getElementById('discipline-q2')?.textContent || '0.00';
    const discQ3 = document.getElementById('discipline-q3')?.textContent || '0.00';
    const discQ4 = document.getElementById('discipline-q4')?.textContent || '0.00';
    const discAvg = document.getElementById('discipline-avg')?.textContent || '0.00';
    
    const totalQ1 = document.getElementById('total-q1')?.textContent || '0.00';
    const totalQ2 = document.getElementById('total-q2')?.textContent || '0.00';
    const totalQ3 = document.getElementById('total-q3')?.textContent || '0.00';
    const totalQ4 = document.getElementById('total-q4')?.textContent || '0.00';
    const totalAvg = document.getElementById('total-avg')?.textContent || '0.00';
    
    const q1Status = document.getElementById('status-q1')?.innerHTML || 'Not Started';
    const q2Status = document.getElementById('status-q2')?.innerHTML || 'Not Started';
    const q3Status = document.getElementById('status-q3')?.innerHTML || 'Not Started';
    const q4Status = document.getElementById('status-q4')?.innerHTML || 'Not Started';
    const overallStatus = document.getElementById('overall-status')?.textContent || 'In Progress';
    
    const completionPercent = document.getElementById('completion-percentage')?.textContent || '0% Complete';
    const annualRating = document.getElementById('annual-rating')?.textContent || 'Not Rated';
    
    // Calculate maturity levels
    const sortAvgNum = parseFloat(sortAvg);
    const systAvgNum = parseFloat(systAvg);
    const sweepAvgNum = parseFloat(sweepAvg);
    const standAvgNum = parseFloat(standAvg);
    const discAvgNum = parseFloat(discAvg);
    
    return `
    <div class="page">
        <div class="report-header">
            <h1><i class="fas fa-chart-bar"></i> SHEET SUMMARY</h1>
            <h2>5S Performance Report</h2>
        </div>
        
        <!-- Sheet Summary Table -->
        <table class="sheet-summary-table">
            <thead>
                <tr>
                    <th>5S Categories</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                    <th>Q4</th>
                    <th>Annual<br>Average</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="category-name"><i class="fas fa-filter"></i> Sort (Seiri)</td>
                    <td>${sortQ1}</td>
                    <td>${sortQ2}</td>
                    <td>${sortQ3}</td>
                    <td>${sortQ4}</td>
                    <td><strong>${sortAvg}</strong></td>
                </tr>
                <tr>
                    <td class="category-name"><i class="fas fa-th-large"></i> Systematize (Seiton)</td>
                    <td>${systQ1}</td>
                    <td>${systQ2}</td>
                    <td>${systQ3}</td>
                    <td>${systQ4}</td>
                    <td><strong>${systAvg}</strong></td>
                </tr>
                <tr>
                    <td class="category-name"><i class="fas fa-broom"></i> Sweep (Seiso)</td>
                    <td>${sweepQ1}</td>
                    <td>${sweepQ2}</td>
                    <td>${sweepQ3}</td>
                    <td>${sweepQ4}</td>
                    <td><strong>${sweepAvg}</strong></td>
                </tr>
                <tr>
                    <td class="category-name"><i class="fas fa-clipboard-list"></i> Standardize (Seiketsu)</td>
                    <td>${standQ1}</td>
                    <td>${standQ2}</td>
                    <td>${standQ3}</td>
                    <td>${standQ4}</td>
                    <td><strong>${standAvg}</strong></td>
                </tr>
                <tr>
                    <td class="category-name"><i class="fas fa-trophy"></i> Self-Discipline (Shitsuke)</td>
                    <td>${discQ1}</td>
                    <td>${discQ2}</td>
                    <td>${discQ3}</td>
                    <td>${discQ4}</td>
                    <td><strong>${discAvg}</strong></td>
                </tr>
                <tr class="total-row">
                    <td><strong>Total Average Score</strong></td>
                    <td><strong>${totalQ1}</strong></td>
                    <td><strong>${totalQ2}</strong></td>
                    <td><strong>${totalQ3}</strong></td>
                    <td><strong>${totalQ4}</strong></td>
                    <td><strong>${totalAvg}</strong></td>
                </tr>
            </tbody>
        </table>
        
        <div class="summary-footer">
            <div class="completion-info">
                <span>${completionPercent}</span>
                <div class="completion-bar">
                    <div class="completion-fill" style="width: ${completionPercent.replace('% Complete', '')}%"></div>
                </div>
            </div>
            <div class="annual-info">
                Annual Performance: <span id="annual-rating">${annualRating}</span>
            </div>
        </div>
        
        <!-- Scoring Summary -->
        <div class="scoring-summary">
            <h3 style="margin: 30px 0 15px; text-align: center;">5S SCORING SUMMARY</h3>
            <table style="width: 60%; margin: 0 auto;">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Annual Average</th>
                        <th>Achieved Level</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sort (S1)</td>
                        <td>${sortAvg}</td>
                        <td>${getMaturityLevel(sortAvgNum)}</td>
                    </tr>
                    <tr>
                        <td>Systematize (S2)</td>
                        <td>${systAvg}</td>
                        <td>${getMaturityLevel(systAvgNum)}</td>
                    </tr>
                    <tr>
                        <td>Sweep (S3)</td>
                        <td>${sweepAvg}</td>
                        <td>${getMaturityLevel(sweepAvgNum)}</td>
                    </tr>
                    <tr>
                        <td>Standardize (S4)</td>
                        <td>${standAvg}</td>
                        <td>${getMaturityLevel(standAvgNum)}</td>
                    </tr>
                    <tr>
                        <td>Self-Discipline (S5)</td>
                        <td>${discAvg}</td>
                        <td>${getMaturityLevel(discAvgNum)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Maturity Level Summary -->
        <h1 style="text-align: center; margin: 40px 0 20px;">5S MATURITY LEVEL SUMMARY</h1>
        <table class="sheet-summary-table maturity-table">
            <thead>
                <tr>
                    <th>MATURITY LEVEL</th>
                    <th>SORT</th>
                    <th>SYSTEMATIZE</th>
                    <th>SWEEP</th>
                    <th>STANDARDIZE</th>
                    <th>SELF-DISCIPLINE</th>
                </tr>
            </thead>
            <tbody>
                ${generateMaturityRows(sortAvgNum, systAvgNum, sweepAvgNum, standAvgNum, discAvgNum)}
            </tbody>
        </table>
        
        <div class="page-footer">
            Page 2 of 4
        </div>
    </div>
    `;
}

// PAGE 3: Action Plan
function generatePage3(auditor, site, auditDate, currentDate) {
    // Load saved action plan data to get counts
    let openCount = 0;
    let categoryFindingsSums = {
        'Sort': 0,
        'Systematize': 0,
        'Sweep': 0,
        'Standardize': 0,
        'Self-Discipline': 0
    };
    
    try {
        const savedData = localStorage.getItem('currentActionPlan');
        if (savedData) {
            const actionPlanData = JSON.parse(savedData);
            
            // Count open items
            if (actionPlanData.tables) {
                actionPlanData.tables.forEach(table => {
                    if (table.rows) {
                        table.rows.forEach(row => {
                            // Status is the 8th column (index 7) in 9-column structure
                            if (row[7] && row[7].value === 'open') {
                                openCount++;
                            }
                        });
                    }
                });
            }
            
            // Count findings sums by category
            if (actionPlanData.tables) {
                actionPlanData.tables.forEach(table => {
                    if (table.rows) {
                        table.rows.forEach(row => {
                            // Ref Criteria is the 2nd column (index 1)
                            // Findings count is the 4th column (index 3)
                            if (row[1] && row[1].value && row[3] && row[3].value) {
                                const refValue = row[1].value;
                                const findingsValue = parseInt(row[3].value) || 0;
                                
                                if (refValue.startsWith('q1.') || refValue.startsWith('S1.')) {
                                    categoryFindingsSums['Sort'] += findingsValue;
                                } else if (refValue.startsWith('q2.') || refValue.startsWith('S2.')) {
                                    categoryFindingsSums['Systematize'] += findingsValue;
                                } else if (refValue.startsWith('q3.') || refValue.startsWith('S3.')) {
                                    categoryFindingsSums['Sweep'] += findingsValue;
                                } else if (refValue.startsWith('q4.') || refValue.startsWith('S4.')) {
                                    categoryFindingsSums['Standardize'] += findingsValue;
                                } else if (refValue.startsWith('q5.') || refValue.startsWith('S5.')) {
                                    categoryFindingsSums['Self-Discipline'] += findingsValue;
                                }
                            }
                        });
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading action plan data for counts:', error);
    }
    
    return `
    <div class="page">
        <div class="report-header">
            <h1><i class="fas fa-clipboard-list"></i> OFFICE 5S ACTION PLAN</h1>
        </div>
        
        <div style="margin: 20px 0;">
            <strong>There are <span id="open-actions">${openCount}</span> open action items.</strong>
        </div>
        
        <div style="margin: 15px 0;">
            <strong>There are <span id="sort-count">${categoryFindingsSums['Sort']}</span> Sort findings, <span id="systematize-count">${categoryFindingsSums['Systematize']}</span> Systematize findings, <span id="sweep-count">${categoryFindingsSums['Sweep']}</span> Sweep findings, <span id="standardize-count">${categoryFindingsSums['Standardize']}</span> Standardize findings, <span id="discipline-count">${categoryFindingsSums['Self-Discipline']}</span> Self-Discipline findings.</strong>
        </div>
        
        <div style="display: flex; gap: 20px; margin: 15px 0; font-size: 12px;">
            <span><strong>Status:</strong> O - Open | C - Closed</span>
            <span><strong>Categories:</strong> S1 - Sort, S2 - Systematize, S3 - Sweep, S4 - Standardize, S5 - Self-Discipline</span>
        </div>
        
        ${generateActionPlanTables()}
        
        <div class="signature-section">
            <div class="signature-label">Acknowledged by:</div>
            <br>
            <br>
            <div class="signature-line"></div>
            <div class="signature-role">        5S Point Person</div>
        </div>
        
        <div class="footer" style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 10px;">
            <p><strong>Office 5S Action Plan</strong> - Generated on: ${currentDate}</p>
        </div>
        
        <div class="page-footer">
            Page 3 of 4
        </div>
    </div>
    `;
}

// PAGE 4: Photo Evidence
function generatePage4() {
    // Collect all photos
    const photoData = [];
    
    for (let q = 1; q <= 4; q++) {
        const quarterPhotos = auditState.quarters[q].photos || [];
        
        quarterPhotos.forEach(photo => {
            let questionDetails = null;
            let categoryInfo = null;
            
            for (const category of questionsData) {
                for (const subcat of category.subcategories) {
                    const question = subcat.questions.find(q => q.id === photo.questionId);
                    if (question) {
                        questionDetails = question;
                        categoryInfo = {
                            category: category,
                            subcategory: subcat
                        };
                        break;
                    }
                }
                if (questionDetails) break;
            }
            
            if (questionDetails && categoryInfo) {
                photoData.push({
                    quarter: q,
                    category: categoryInfo.category,
                    subcategory: categoryInfo.subcategory,
                    question: questionDetails,
                    photo: photo
                });
            }
        });
    }
    
    // Group by category
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) {
            grouped[catId] = {
                category: item.category,
                items: []
            };
        }
        grouped[catId].items.push(item);
    });
    
    // Define the correct order of categories
    const categoryOrder = ['Sort', 'Systematize', 'Sweep', 'Standardize', 'Self-Discipline'];
    
    // Sort the category keys according to the defined order
    const sortedCategoryIds = Object.keys(grouped).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
    
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    
    // Format the audit date
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Not set';
    
    let photoHTML = '';
    
    if (photoData.length === 0) {
        photoHTML = `
        <div style="text-align: center; padding: 50px; background: #f8f9fa; border-radius: 8px; margin: 30px 0;">
            <i class="fas fa-camera" style="font-size: 48px; color: #95a5a6; margin-bottom: 20px;"></i>
            <h3 style="color: #2c3e50;">No Photo Evidence Found</h3>
            <p style="color: #7f8c8d;">Upload photos by clicking the camera icon next to each question in the audit form.</p>
        </div>
        `;
    } else {
        // Loop through sorted category IDs
        sortedCategoryIds.forEach(catId => {
            const group = grouped[catId];
            const category = group.category;
            
            photoHTML += `
            <div class="category-section" style="margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; page-break-inside: avoid;">
                <div class="category-title" style="background: ${category.color}; padding: 12px 15px; color: white; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
                    <span>
                        <i class="${category.icon}"></i> 
                        ${category.id} - ${category.title}
                    </span>
                    <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 13px;">
                        ${group.items.length} photo${group.items.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f5f5f5;">
                            <th style="padding: 10px 15px; text-align: left; border-bottom: 2px solid #ddd; width: 50%; font-weight: 600;">Findings based on 5S Action Plan</th>
                            <th style="padding: 10px 15px; text-align: left; border-bottom: 2px solid #ddd; width: 50%; font-weight: 600;">PHOTO EVIDENCE</th>
                         </tr>
                    </thead>
                    <tbody>
            `;
            
            group.items.forEach(item => {
                const quarterName = quarterNames[item.quarter - 1];
                const savedComment = auditState.quarters[item.quarter].comments[item.question.id] || '';
                
                photoHTML += `
                <tr style="border-bottom: 1px solid #eee; page-break-inside: avoid;">
                    <td style="padding: 15px 15px; vertical-align: top; background: #fafafa;">
                        <div style="background: white; border-left: 4px solid #3498db; padding: 12px; margin: 10px 0; border-radius: 4px;">
                            <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 5px; text-transform: uppercase;">Description:</div>
                            <div style="white-space: pre-wrap; font-size: 13px; line-height: 1.5; color: #2c3e50;">${savedComment || 'No description added'}</div>
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: #7f8c8d; display: flex; gap: 15px;">
                            <span><strong>Quarter:</strong> ${quarterName}</span>
                            <span><strong>Category:</strong> ${item.subcategory.title}</span>
                            <span><strong>ID:</strong> ${item.question.title}</span>
                        </div>
                     </td>
                    <td style="padding: 15px 15px; text-align: center; vertical-align: middle; background: white;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="${item.photo.dataUrl}" 
                                 style="max-width: 200px; max-height: 150px; object-fit: contain; border-radius: 8px; border: 3px solid #dee2e6; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
                                 title="${item.photo.fileName}">
                            <div style="margin-top: 10px; font-size: 10px; color: #7f8c8d; max-width: 200px; word-break: break-all;">
                                <i class="fas fa-file-image"></i> ${item.photo.fileName}
                            </div>
                            <div style="margin-top: 5px; font-size: 9px; color: #95a5a6;">
                                Uploaded: ${new Date(item.photo.uploadedAt).toLocaleDateString()}
                            </div>
                        </div>
                     </td>
                 </tr>
                `;
            });
            
            photoHTML += `
                    </tbody>
                  </table>
            </div>
            `;
        });
    }
    
    // Add summary footer
    photoHTML += `
    <div style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 11px; padding: 20px; border-top: 2px solid #ecf0f1;">
        <i class="fas fa-camera"></i> 5S Audit Photo Evidence Report<br>
        <span style="font-size: 10px;">Audit Site: ${auditState.site || 'Not Specified'} | Audit Date: ${displayDate} | Total Photos: ${photoData.length}</span>
    </div>
    `;
    
    return `
    <div class="page">
        <div class="report-header">
            <h1><i class="fas fa-images"></i> PHOTO EVIDENCE REPORT</h1>
            <h2>5S Audit Findings Documentation</h2>
        </div>
        
        <div class="audit-info-section" style="margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="background: ${photoData.length > 0 ? '#27ae60' : '#e74c3c'}; color: white; padding: 5px 15px; border-radius: 25px; font-size: 13px; font-weight: bold;">
                    <i class="fas fa-camera"></i> ${photoData.length} Photo${photoData.length !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
        
        ${photoHTML}
        
        <div class="page-footer">
            Page 4 of 4
        </div>
    </div>
    `;
}

function generateActionPlanTables() {
    console.log('generateActionPlanTables called');
    let html = '';
    
    // Load saved action plan data
    let actionPlanData = null;
    try {
        const savedData = localStorage.getItem('currentActionPlan');
        if (savedData) {
            actionPlanData = JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Error loading action plan data:', error);
    }
    
    if (actionPlanData && actionPlanData.tables) {
        // Loop through each table in the saved data
        actionPlanData.tables.forEach((table, index) => {
            const title = (table.title || 'Table').toUpperCase();
            const rows = table.rows || [];
            
            html += `
            <div class="section-title">${title}</div>
            <table class="action-plan-table">
                <thead>
                    <tr>
                        <th>Date of Audit</th>
                        <th>Ref. Criteria</th>
                        <th>Description</th>
                        <th>No. of Findings</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>For Action</th>
                     </tr>
                </thead>
                <tbody>
            `;
            
            // Add rows
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                html += `<tr>`;
                
                // Column 1: Date of Audit
                let dateValue = row[0]?.value || '';
                if (dateValue.includes('-')) {
                    const parts = dateValue.split('-');
                    dateValue = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
                html += `<td style="text-align: center;">${dateValue || '________'} </td>`;
                
                // Column 2: Ref. Criteria
                let refValue = row[1]?.value || '';
                const refMap = {
                    'q1.1': 'Sort 1', 'q1.2': 'Sort 2', 'q1.3': 'Sort 3', 'q1.4': 'Sort 4',
                    'q1.5': 'Sort 5', 'q1.6': 'Sort 6', 'q1.7': 'Sort 7', 'q1.8': 'Sort 8',
                    'q1.9': 'Sort 9', 'q1.10': 'Sort 10', 'q1.11': 'Sort 11', 'q1.12': 'Sort 12',
                    'q2.1': 'Systematize 1', 'q2.2': 'Systematize 2', 'q2.3': 'Systematize 3',
                    'q2.4': 'Systematize 4', 'q2.5': 'Systematize 5', 'q2.6': 'Systematize 6',
                    'q2.7': 'Systematize 7', 'q2.8': 'Systematize 8', 'q2.9': 'Systematize 9',
                    'q2.10': 'Systematize 10', 'q2.11': 'Systematize 11', 'q2.12': 'Systematize 12',
                    'q2.13': 'Systematize 13', 'q3.1': 'Sweep 1', 'q3.2': 'Sweep 2', 'q3.3': 'Sweep 3',
                    'q3.4': 'Sweep 4', 'q3.5': 'Sweep 5', 'q3.6': 'Sweep 6', 'q3.7': 'Sweep 7',
                    'q3.8': 'Sweep 8', 'q3.9': 'Sweep 9', 'q3.10': 'Sweep 10', 'q4.1': 'Standardize 1',
                    'q4.2': 'Standardize 2', 'q4.3': 'Standardize 3', 'q4.4': 'Standardize 4',
                    'q4.5': 'Standardize 5', 'q4.6': 'Standardize 6', 'q4.7': 'Standardize 7',
                    'q5.1': 'Self-discipline 1', 'q5.2': 'Self-discipline 2', 'q5.3': 'Self-discipline 3',
                    'q5.4': 'Self-discipline 4', 'q5.5': 'Self-discipline 5', 'q5.6': 'Self-discipline 6',
                    'q5.7': 'Self-discipline 7', 'q5.8': 'Self-discipline 8', 'q5.9': 'Self-discipline 9',
                    'q5.10': 'Self-discipline 10', 'q5.11': 'Self-discipline 11', 'q5.12': 'Self-discipline 12'
                };
                refValue = refMap[refValue] || refValue;
                html += `<td style="text-align: center;">${refValue || '________'} </td>`;
                
                // Column 3: Description
                html += `<td>${row[2]?.value || '________'} </td>`;
                
                // Column 4: No. of Findings (this is the sum we want)
                html += `<td style="text-align: center;">${row[3]?.value || '_'} </td>`;
                
                // Column 5: Date (Target Date)
                let targetValue = row[4]?.value || '';
                if (targetValue.includes('-')) {
                    const parts = targetValue.split('-');
                    targetValue = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
                html += `<td style="text-align: center;">${targetValue || '________'} </td>`;
                
                // Column 6: Status
                let statusValue = row[5]?.value || '';
                statusValue = statusValue === 'open' ? 'O' : (statusValue === 'close' ? 'C' : statusValue);
                html += `<td style="text-align: center;">${statusValue || '_'} </td>`;
                
                // Column 7: For Action
                let forActionValue = row[6]?.value || '';
                const forActionMap = {
                    'ma': 'Maintenance Unit',
                    'au': 'Auditee'
                };
                forActionValue = forActionMap[forActionValue] || forActionValue;
                html += `<td style="text-align: center;">${forActionValue || '________'} </td>`;
                
                html += `</tr>`;
            }
            
            // Add at least 2 empty rows if no data
            if (rows.length === 0) {
                for (let i = 0; i < 2; i++) {
                    html += `
                    <tr>
                        <td style="text-align: center;">________</td>
                        <td style="text-align: center;">________</td>
                        <td>________</td>
                        <td style="text-align: center;">_</td>
                        <td style="text-align: center;">________</td>
                        <td style="text-align: center;">_</td>
                        <td style="text-align: center;">________</td>
                    </tr>
                    `;
                }
            }
            
            html += `
                </tbody>
            </table>
            `;
        });
    }
    
    return html;
}

// Helper function to generate all questions rows with merged cells (no colors)
function generateAllQuestionsRows() {
    let rows = '';
    
    // First, calculate rowspans for each category and subcategory
    const categoryRowSpans = {};
    const subcategoryRowSpans = {};
    
    // Calculate how many rows each category spans
    questionsData.forEach(category => {
        let totalRows = 0;
        category.subcategories.forEach(subcat => {
            totalRows += subcat.questions.length;
        });
        categoryRowSpans[category.id] = totalRows;
    });
    
    // Calculate how many rows each subcategory spans
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            subcategoryRowSpans[`${category.id}_${subcat.title}`] = subcat.questions.length;
        });
    });
    
    // Track if we've already rendered the category for current row
    let currentCategory = '';
    let currentSubcategory = '';
    
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            subcat.questions.forEach((question, qIndex) => {
                const q1Score = auditState.quarters[1].scores[question.id] || 0;
                const q2Score = auditState.quarters[2].scores[question.id] || 0;
                const q3Score = auditState.quarters[3].scores[question.id] || 0;
                const q4Score = auditState.quarters[4].scores[question.id] || 0;
                
                const isFirstInCategory = (currentCategory !== category.id);
                const isFirstInSubcategory = (currentSubcategory !== subcat.title);
                
                rows += ``;
                
                // Category cell with rowspan (plain styling)
                if (isFirstInCategory) {
                    rows += `<td rowspan="${categoryRowSpans[category.id]}" 
                                style="vertical-align: top; 
                                       font-weight: bold; 
                                       border-right: 1px solid #ddd;">${category.id}</td>`;
                    currentCategory = category.id;
                }
                
                // Subcategory cell with rowspan (plain styling)
                if (isFirstInSubcategory) {
                    rows += `<td rowspan="${subcategoryRowSpans[`${category.id}_${subcat.title}`]}" 
                                style="vertical-align: top; 
                                       font-style: italic;">${subcat.title}</td>`;
                    currentSubcategory = subcat.title;
                }
                
                // Question cells (plain styling)
                rows += `
                    <td style="text-align: center; font-weight: 500;">${question.title}</td>
                    <td>${question.text}</td>
                    <td style="text-align: center;">${q1Score}</td>
                    <td style="text-align: center;">${q2Score}</td>
                    <td style="text-align: center;">${q3Score}</td>
                    <td style="text-align: center;">${q4Score}</td>
                 </tr>`;
            });
        });
        // Reset for next category
        currentCategory = '';
        currentSubcategory = '';
    });
    
    return rows;
}

// Helper function to generate maturity rows with checkmarks - FIXED COLUMN ALIGNMENT
function generateMaturityRows(sortAvg, systAvg, sweepAvg, standAvg, discAvg) {
    return `
    <!-- LEVEL 5 -->
    <tr>
        <td><strong>LEVEL 5<br><span style="font-size: 0.9em; font-weight: normal;">Focus on Prevention</span></strong>\\
        <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Employees are continually seeking improvement opportunities</span>
                ${sortAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Anyone can walk into the work area and easily locate items. Abnormal conditions are visually obvious and corrective action measures are in place.</span>
                ${systAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Area employees have devised a dependable and documented method of preventive cleaning and maintenance. Work area cleanliness and organization are a way of life.</span>
                ${sweepAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Employees are continually seeking the elimination of waste, all changes are documented and information is shared with employees.</span>
                ${standAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Employees maintain consistent standards in compliance with the 5S program.</span>
                ${discAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
     </tr>
    
    <!-- LEVEL 4 -->
    <tr>
        <td><strong>LEVEL 4<br><span style="font-size: 0.9em; font-weight: normal;">Focus on Consistency</span></strong>\\
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">A dependable documented method has been established to maintain a work area free of unnecessary items.</span>
                ${sortAvg >= 2.41 && sortAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">A dependable and documented method has been established to recognize, with a visual sweep, if items are out of place or exceed quantity limits.</span>
                ${systAvg >= 2.41 && systAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">5S schedules detailing tasks and responsibilities are understood and practiced.</span>
                ${sweepAvg >= 2.41 && sweepAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Workplace method improvements are visible and understood by all employees.</span>
                ${standAvg >= 2.41 && standAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Checklists exist showing that employees follow through on 5S schedules.</span>
                ${discAvg >= 2.41 && discAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
     </tr>
    
    <!-- LEVEL 3 -->
    <tr>
        <td><strong>LEVEL 3<br><span style="font-size: 0.9em; font-weight: normal;">Make it Visual</span></strong>\\
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">All unnecessary items have been removed from the work area.</span>
                ${sortAvg >= 1.61 && sortAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Designated locations are marked to make organization more visible.</span>
                ${systAvg >= 1.61 && systAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">5S schedules detailing tasks and responsibilities are developed and utilized.</span>
                ${sweepAvg >= 1.61 && sweepAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Workplace method improvements are being incorporated and documented.</span>
                ${standAvg >= 1.61 && standAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">5S schedules detailing tasks and responsibilities have been developed and are utilized.</span>
                ${discAvg >= 1.61 && discAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
     </tr>
    
    <!-- LEVEL 2 -->
    <tr>
        <td><strong>LEVEL 2<br><span style="font-size: 0.9em; font-weight: normal;">Focus on Basics</span></strong>\\
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Necessary and unnecessary items are separated.</span>
                ${sortAvg >= 0.81 && sortAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">A designated location has been established for all items.</span>
                ${systAvg >= 0.81 && systAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Workplace areas are cleaned on a regularly scheduled basis.</span>
                ${sweepAvg >= 0.81 && sweepAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Workplace methods are being improved, but changes have not been documented.</span>
                ${standAvg >= 0.81 && standAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">A recognized effort has been made to improve the condition of the work environment.</span>
                ${discAvg >= 0.81 && discAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
     </tr>
    
    <!-- LEVEL 1 -->
    <tr>
        <td><strong>LEVEL 1<br><span style="font-size: 0.9em; font-weight: normal;">Just Beginning</span></strong>\\
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Necessary and unnecessary items are mixed together in the work area.</span>
                ${sortAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Tools, supplies, books and materials are randomly located.</span>
                ${systAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Workplace areas are dirty and disorganized.</span>
                ${sweepAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">No attempt is being made to document or improve current processes.</span>
                ${standAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
         <td style="vertical-align: middle;">
            <div class="description-with-check">
                <span class="description-text">Minimal attention is spent on housekeeping.</span>
                ${discAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}
            </div>
         </td>
     </tr>
    `;
}

// ========== AUDIT REMARKS & SIGNATURE FUNCTIONS ==========

// Function to set today's date for signature
function setSignatureDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const signatureDateSpan = document.getElementById('signatureDate');
    if (signatureDateSpan) {
        signatureDateSpan.textContent = formattedDate;
    }
}

// Function to save audit remarks to localStorage
function saveAuditRemarks() {
    try {
        const remarks = document.getElementById('auditRemarks')?.value || '';
        const signature = document.getElementById('auditorSignature')?.value || '';
        const signatureDate = document.getElementById('signatureDate')?.textContent || '';
        
        // Collect auditors for Q1, Q2, Q3, Q4
        const quarterAuditors = {
            Q1: '',
            Q1Date: '',
            Q2: '',
            Q2Date: '',
            Q3: '',
            Q3Date: '',
            Q4: '',
            Q4Date: ''
        };
        
        // Get all auditor entries
        const auditorEntries = document.querySelectorAll('.auditor-entry');
        
        auditorEntries.forEach(entry => {
            // Look for h3 tag instead of h1
            const heading = entry.querySelector('h3')?.textContent || '';
            const nameInput = entry.querySelector('.auditor-name');
            const dateInput = entry.querySelector('.auditor-date');
            
            if (heading === 'Q1') {
                quarterAuditors.Q1 = nameInput?.value || '';
                quarterAuditors.Q1Date = dateInput?.value || '';
            } else if (heading === 'Q2') {
                quarterAuditors.Q2 = nameInput?.value || '';
                quarterAuditors.Q2Date = dateInput?.value || '';
            } else if (heading === 'Q3') {
                quarterAuditors.Q3 = nameInput?.value || '';
                quarterAuditors.Q3Date = dateInput?.value || '';
            } else if (heading === 'Q4') {
                quarterAuditors.Q4 = nameInput?.value || '';
                quarterAuditors.Q4Date = dateInput?.value || '';
            }
        });
        
        const remarksData = {
            remarks: remarks,
            signature: signature,
            signatureDate: signatureDate,
            quarterAuditors: quarterAuditors,
            savedAt: new Date().toISOString()
        };
        
        localStorage.setItem('auditRemarksData', JSON.stringify(remarksData));
        console.log('Remarks saved:', remarksData);
        
        if (typeof showStatusMessage === 'function') {
            showStatusMessage('Remarks saved', 'success');
        }
    } catch (error) {
        console.error('Error saving remarks:', error);
    }
}

// Function to load audit remarks from localStorage
function loadAuditRemarks() {
    try {
        const savedData = localStorage.getItem('auditRemarksData');
        console.log('Loading remarks, saved data exists:', !!savedData);
        
        if (savedData) {
            const remarksData = JSON.parse(savedData);
            
            // Load remarks textarea
            const remarksTextarea = document.getElementById('auditRemarks');
            if (remarksTextarea) {
                remarksTextarea.value = remarksData.remarks || '';
            }
            
            // Load signature input
            const signatureInput = document.getElementById('auditorSignature');
            if (signatureInput) {
                signatureInput.value = remarksData.signature || '';
            }
            
            // Load signature date
            const signatureDateSpan = document.getElementById('signatureDate');
            if (signatureDateSpan && remarksData.signatureDate) {
                signatureDateSpan.textContent = remarksData.signatureDate;
            }
            
            // Load quarter auditors (Q1-Q4) - with h3 tags
            if (remarksData.quarterAuditors) {
                const auditorEntries = document.querySelectorAll('.auditor-entry');
                console.log('Found auditor entries:', auditorEntries.length);
                
                auditorEntries.forEach(entry => {
                    // Look for h3 tag instead of h1
                    const heading = entry.querySelector('h3')?.textContent || '';
                    const nameInput = entry.querySelector('.auditor-name');
                    const dateInput = entry.querySelector('.auditor-date');
                    
                    if (heading === 'Q1') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q1 || '';
                        if (dateInput) dateInput.value = remarksData.quarterAuditors.Q1Date || '';
                        console.log('Loaded Q1:', remarksData.quarterAuditors.Q1, remarksData.quarterAuditors.Q1Date);
                    } else if (heading === 'Q2') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q2 || '';
                        if (dateInput) dateInput.value = remarksData.quarterAuditors.Q2Date || '';
                        console.log('Loaded Q2:', remarksData.quarterAuditors.Q2, remarksData.quarterAuditors.Q2Date);
                    } else if (heading === 'Q3') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q3 || '';
                        if (dateInput) dateInput.value = remarksData.quarterAuditors.Q3Date || '';
                        console.log('Loaded Q3:', remarksData.quarterAuditors.Q3, remarksData.quarterAuditors.Q3Date);
                    } else if (heading === 'Q4') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q4 || '';
                        if (dateInput) dateInput.value = remarksData.quarterAuditors.Q4Date || '';
                        console.log('Loaded Q4:', remarksData.quarterAuditors.Q4, remarksData.quarterAuditors.Q4Date);
                    }
                });
            }
            
            if (typeof showStatusMessage === 'function') {
                showStatusMessage('Remarks loaded', 'success');
            }
        } else {
            console.log('No saved remarks found');
        }
    } catch (error) {
        console.error('Error loading remarks:', error);
    }
}

// Function to auto-save on input changes
function setupAutoSave() {
    setTimeout(() => {
        const remarksTextarea = document.getElementById('auditRemarks');
        const signatureInput = document.getElementById('auditorSignature');
        
        if (remarksTextarea) {
            remarksTextarea.removeEventListener('input', saveAuditRemarks);
            remarksTextarea.addEventListener('input', saveAuditRemarks);
        }
        
        if (signatureInput) {
            signatureInput.removeEventListener('input', saveAuditRemarks);
            signatureInput.addEventListener('input', saveAuditRemarks);
        }
        
        // Also listen for changes on all auditor inputs
        const auditorsList = document.getElementById('auditorsList');
        if (auditorsList) {
            auditorsList.removeEventListener('input', saveAuditRemarks);
            auditorsList.addEventListener('input', function(e) {
                if (e.target.classList.contains('auditor-name') || e.target.classList.contains('auditor-date')) {
                    saveAuditRemarks();
                }
            });
        }
        
        console.log('Auto-save setup complete');
    }, 100);
}

// Initialize remarks section
function initRemarksSection() {
    console.log('Initializing remarks section');
    setSignatureDate();
    loadAuditRemarks();
    setupAutoSave();
    
    // Also try to load after a short delay to ensure everything is ready
    setTimeout(() => {
        loadAuditRemarks();
    }, 200);
}

// Multiple ways to ensure initialization happens
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRemarksSection);
} else {
    initRemarksSection();
}

// Also run on window load as a backup
window.addEventListener('load', function() {
    setTimeout(loadAuditRemarks, 100);
});