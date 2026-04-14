// js/app.js

// State Management
const auditState = {
    currentQuarter: 1,
    auditor: '',
    site: '',
    year: new Date().getFullYear(),
    auditDate: new Date().toISOString().split('T')[0],
    quarters: {
        1: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} },
        2: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} },
        3: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} },
        4: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} }
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
        title: 'Systematize - A place for everything and everything in its space.',
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
        title: 'Sweep - Routine discipline maintaining a clean and organized workplace',
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
        title: 'Standardize - Preventing the area from having abnormal operating conditions',
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
        title: 'Self-Discipline - Stick to the rules',
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

function initializeApplication() {
    loadAuditState();
    
    const auditorInput = document.getElementById('auditorName');
    const yearInput = document.getElementById('auditYear');
    const siteInput = document.getElementById('department');
    
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
    
    if (siteInput) {
        siteInput.value = auditState.site || '';
        siteInput.addEventListener('change', function() {
            auditState.site = this.value;
            saveAuditState();
        });
    }
    
    updateSheetSummary();
    setTimeout(updateAnnualAverageColors, 100);
    setTimeout(updateMaturityTable, 200);
    setTimeout(updateQuarterNavDisplay, 100);

    const currentAuditorInput = document.getElementById('currentAuditor');
    if (currentAuditorInput) {
        loadCurrentAuditorForQuarter(auditState.currentQuarter);
        currentAuditorInput.addEventListener('change', function() {
            saveCurrentAuditorToQuarter(this.value);
        });
        currentAuditorInput.addEventListener('blur', function() {
            saveCurrentAuditorToQuarter(this.value);
        });
    }
    loadQuarterAuditorsDisplay();

    const dateInput = document.getElementById('auditDate');
    if (dateInput) {
        loadCurrentDateForQuarter(auditState.currentQuarter);
        dateInput.addEventListener('change', function() {
            saveCurrentDateToQuarter(this.value);
        });
    }
}

function setupEventListeners() {
    quarterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const quarter = parseInt(this.dataset.quarter);
            switchQuarter(quarter);
        });
    });
}

function switchQuarter(quarter) {
    auditState.currentQuarter = quarter;
    
    quarterTabs.forEach(tab => {
        if (parseInt(tab.dataset.quarter) === quarter) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    currentQuarterIndicator.querySelector('span').textContent = `${quarterNames[quarter-1]} Quarter`;
    
    loadQuarterContent(quarter);
    loadCurrentAuditorForQuarter(quarter);
    loadCurrentDateForQuarter(quarter); 
    saveAuditState();
}

function loadQuarterContent(quarter) {
    quarterContent.innerHTML = '';
    
    const mainContainer = document.createElement('div');
    mainContainer.className = 'questionnaire-container';
    
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
    
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';
    
    questionsData.forEach((category) => {
        const categoryCard = createCategoryCard(category, quarter);
        questionsContainer.appendChild(categoryCard);
    });
    
    mainContainer.appendChild(questionsContainer);
    quarterContent.appendChild(mainContainer);
    
    updateQuarterStats(quarter);
}

function createCategoryCard(category, quarter) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.category = category.id;
    
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
            ${category.subcategories.map((subcat) => createSubcategorySection(category, subcat, quarter)).join('')}
        </div>
    `;
    
    setTimeout(() => {
        card.style.borderLeft = `5px solid ${category.color}`;
        const icon = card.querySelector('.category-title i');
        const title = card.querySelector('.category-title h3');
        const progressBar = card.querySelector('.progress-bar');
        
        if (icon) icon.style.color = category.color;
        if (title) title.style.color = category.color;
        if (progressBar) progressBar.style.background = category.color;
    }, 0);
    
    return card;
}

function createSubcategorySection(category, subcategory, quarter) {
    return `
        <div class="subcategory-section">
            <h4 class="subcategory-title">${subcategory.title}</h4>
            <div class="questions-list">
                ${subcategory.questions.map((question) => createQuestionRow(category.id, question, quarter)).join('')}
            </div>
        </div>
    `;
}

function createQuestionRow(categoryId, question, quarter) {
    let currentScore = 0;
    let currentComment = '';
    let currentFindings = '';
    
    if (auditState && auditState.quarters && auditState.quarters[quarter]) {
        currentScore = auditState.quarters[quarter].scores[question.id] || 0;
        currentComment = auditState.quarters[quarter].comments[question.id] || '';
        currentFindings = auditState.quarters[quarter].findings?.[question.id] || '';
    }
    
    const category = questionsData.find(cat => cat.id === categoryId);
    const categoryColor = category ? category.color : '#3498db';
    
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
                            <i class="fas fa-camera"></i>
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

function findingsToScore(findings) {
    const numFindings = parseInt(findings);
    if (isNaN(numFindings)) return null;
    if (numFindings < 0) return null;
    if (numFindings === 0) return 4;
    if (numFindings >= 1 && numFindings <= 3) return 3;
    if (numFindings >= 4 && numFindings <= 6) return 2;
    if (numFindings >= 7 && numFindings <= 9) return 1;
    if (numFindings >= 10) return 0;
    return null;
}

function updateScoreFromFindings(questionId, quarter, findingsValue) {
    if (findingsValue === '' || findingsValue === null) {
        setQuestionScore(questionId, 0, quarter, '');
        const inputField = document.querySelector(`.findings-field[data-question-id="${questionId}"][data-quarter="${quarter}"]`);
        if (inputField) inputField.value = '';
        const scoreDisplay = document.getElementById(`score-${questionId}-${quarter}`);
        if (scoreDisplay) scoreDisplay.textContent = '0';
        return;
    }
    
    const score = findingsToScore(findingsValue);
    
    if (score !== null) {
        setQuestionScore(questionId, score, quarter, findingsValue);
        const scoreDisplay = document.getElementById(`score-${questionId}-${quarter}`);
        if (scoreDisplay) scoreDisplay.textContent = score;
        const inputField = document.querySelector(`.findings-field[data-question-id="${questionId}"][data-quarter="${quarter}"]`);
        if (inputField) inputField.value = findingsValue;
    } else {
        alert('Please enter a valid number (0 or positive integer)');
        const inputField = document.querySelector(`.findings-field[data-question-id="${questionId}"][data-quarter="${quarter}"]`);
        if (inputField) {
            const savedFindings = auditState.quarters[quarter].findings?.[questionId] || '';
            inputField.value = savedFindings;
        }
    }
}

function setQuestionScore(questionId, score, quarter, findingsValue = null) {
    auditState.quarters[quarter].scores[questionId] = score;
    
    if (findingsValue !== null) {
        if (!auditState.quarters[quarter].findings) {
            auditState.quarters[quarter].findings = {};
        }
        auditState.quarters[quarter].findings[questionId] = findingsValue;
    }
    
    if (!auditState.quarters[quarter].scoreSet) {
        auditState.quarters[quarter].scoreSet = {};
    }
    auditState.quarters[quarter].scoreSet[questionId] = true;
    auditState.quarters[quarter].lastUpdated = new Date().toISOString();
    
    const questionRow = document.querySelector(`.question-row[data-question-id="${questionId}"]`);
    if (questionRow) {
        const scoreDisplay = questionRow.querySelector('.current-score');
        if (scoreDisplay) scoreDisplay.textContent = score;
    }
    
    const categoryId = questionId.split('.')[0].replace('q', '');
    updateCategoryScore(categoryId, quarter);
    updateQuarterStats(quarter);
    updateSheetSummary();
    saveAuditState();
}

function uploadPhoto(questionId, quarter) {
    const hasPhotos = auditState.quarters[quarter].photos && 
                      auditState.quarters[quarter].photos.some(photo => photo.questionId === questionId);
    
    if (hasPhotos) {
        viewPhoto(questionId, quarter);
    } else {
        const inputId = `photo-input-${questionId}-${quarter}`;
        const fileInput = document.getElementById(inputId);
        if (fileInput) fileInput.click();
    }
}

function handlePhotoUpload(questionId, quarter, inputElement) {
    if (!inputElement.files || inputElement.files.length === 0) return;
    
    const file = inputElement.files[0];
    if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please choose an image under 5MB.');
        inputElement.value = '';
        return;
    }
    if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, GIF, etc.).');
        inputElement.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        if (!auditState.quarters[quarter].photos) {
            auditState.quarters[quarter].photos = [];
        }
        auditState.quarters[quarter].photos = auditState.quarters[quarter].photos.filter(
            photo => photo.questionId !== questionId
        );
        auditState.quarters[quarter].photos.push({
            questionId: questionId,
            fileName: file.name,
            fileType: file.type,
            dataUrl: e.target.result,
            uploadedAt: new Date().toISOString()
        });
        saveAuditState();
        updatePhotoButton(questionId, quarter);
        showStatusMessage(`Photo uploaded for question ${questionId}`, 'success');
    };
    reader.readAsDataURL(file);
}

function updatePhotoButton(questionId, quarter) {
    const uploadBtn = document.querySelector(`.upload-btn[onclick*="${questionId}"]`);
    if (uploadBtn) {
        uploadBtn.classList.add('has-photos');
        uploadBtn.innerHTML = '<i class="fas fa-camera"></i>';
        uploadBtn.title = 'View/Change photo';
    }
}

function viewPhoto(questionId, quarter) {
    const photos = auditState.quarters[quarter].photos || [];
    const photo = photos.find(p => p.questionId === questionId);
    if (!photo) {
        alert('No photo found for this question.');
        return;
    }
    
    const modalHtml = `
        <div class="photo-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; justify-content: center; align-items: center;">
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 90%; max-height: 90%; overflow: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3>Photo for ${questionId}</h3>
                    <button onclick="closePhotoModal()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
                </div>
                <img src="${photo.dataUrl}" alt="${photo.fileName}" style="max-width: 100%; max-height: 70vh; display: block; margin: 0 auto;">
                <div style="margin-top: 15px; text-align: center; color: #666; font-size: 14px;">
                    <p>${photo.fileName}</p>
                    <p>Uploaded: ${new Date(photo.uploadedAt).toLocaleString()}</p>
                    <button onclick="removePhoto('${questionId}', ${quarter})" style="background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
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

function closePhotoModal() {
    const modal = document.getElementById('photoViewModal');
    if (modal) modal.remove();
}

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

function toggleComment(questionId, quarter) {
    const commentPopup = document.getElementById(`comment-${questionId}-${quarter}`);
    if (commentPopup) {
        commentPopup.style.display = commentPopup.style.display === 'none' ? 'block' : 'none';
        if (commentPopup.style.display === 'block') {
            commentPopup.querySelector('textarea').focus();
        }
    }
}

function saveComment(questionId, quarter, comment) {
    auditState.quarters[quarter].comments[questionId] = comment.trim();
    const commentBtn = document.querySelector(`.comment-btn[onclick*="${questionId}"]`);
    if (commentBtn) {
        commentBtn.classList.toggle('has-comment', comment.trim().length > 0);
        commentBtn.innerHTML = `<i class="fas fa-comment${comment.trim().length > 0 ? '-dots' : ''}"></i>`;
    }
    saveAuditState();
}

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

function getCategoryMaxScore(categoryId) {
    const category = questionsData.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    let totalMax = 0;
    category.subcategories.forEach(subcat => {
        subcat.questions.forEach(question => {
            totalMax += question.maxScore;
        });
    });
    const questionCount = category.subcategories.reduce((count, subcat) => count + subcat.questions.length, 0);
    return questionCount > 0 ? totalMax / questionCount : 0;
}

function updateQuarterStats(quarter) {
    const totalQuestions = document.getElementById('totalQuestions');
    const answeredQuestions = document.getElementById('answeredQuestions');
    const currentScore = document.getElementById('currentScore');
    
    if (!totalQuestions || !answeredQuestions || !currentScore) return;
    
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

function getQuarterName(quarter) {
    const names = ['First', 'Second', 'Third', 'Fourth'];
    return names[quarter - 1] || 'Unknown';
}

function updateAnnualAverageColors() {
    const annualAverages = document.querySelectorAll('.annual-average');
    
    annualAverages.forEach(element => {
        const value = parseFloat(element.textContent) || 0;
        element.classList.remove('score-level1', 'score-level2', 'score-level3', 'score-level4', 'score-level5');
        
        if (value >= 0 && value <= 0.80) element.classList.add('score-level1');
        else if (value >= 0.81 && value <= 1.60) element.classList.add('score-level2');
        else if (value >= 1.61 && value <= 2.40) element.classList.add('score-level3');
        else if (value >= 2.41 && value <= 3.20) element.classList.add('score-level4');
        else if (value >= 3.21 && value <= 4.00) element.classList.add('score-level5');
    });
}

function updateSheetSummary() {
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
    
    questionsData.forEach((category) => {
        const catName = category.id.toLowerCase().replace('self-', '');
        for (let q = 1; q <= 4; q++) {
            const score = calculateCategoryScore(category.id, q);
            const element = document.getElementById(`${catName}-q${q}`);
            if (element) element.textContent = score.toFixed(2);
        }
        
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
    
    updateCompletionPercentage();
    updateAnnualAverageColors();
    updateMaturityTable();
}

function updateCompletionPercentage() {
    let totalQuestions = 0;
    let completedQuestions = 0;
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    for (let q = 1; q <= 4; q++) {
        questionsData.forEach(category => {
            category.subcategories.forEach(subcat => {
                subcat.questions.forEach(question => {
                    totalQuestions++;
                    const score = auditState.quarters[q].scores[question.id] || 0;
                    maxPossibleScore += question.maxScore;
                    totalScore += score;
                    if (score > 0) completedQuestions++;
                });
            });
        });
    }
    
    const completionPercentage = totalQuestions > 0 ? (completedQuestions / totalQuestions * 100) : 0;
    const scorePercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore * 100) : 0;
    
    const percentageElement = document.getElementById('completion-percentage');
    const fillElement = document.getElementById('completion-fill');
    const annualRatingElement = document.getElementById('annual-rating');
    
    if (percentageElement) percentageElement.textContent = `${completionPercentage.toFixed(0)}% Complete`;
    if (fillElement) fillElement.style.width = `${completionPercentage}%`;
    if (annualRatingElement) annualRatingElement.textContent = getAnnualRating(scorePercentage);
}

function getAnnualRating(scorePercentage) {
    if (scorePercentage >= 80.25) return "Level 5";
    if (scorePercentage >= 60.25) return "Level 4";
    if (scorePercentage >= 40.25) return "Level 3";
    if (scorePercentage >= 20.25) return "Level 2";
    if (scorePercentage >= 0) return "Level 1";
    return "❌ Invalid";
}

function getTotalQuestionsCount() {
    let count = 0;
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            count += subcat.questions.length;
        });
    });
    return count;
}

function saveAuditState() {
    localStorage.setItem('5S_auditState', JSON.stringify(auditState));
    auditState.lastSaved = new Date().toISOString();
}

function loadAuditState() {
    const saved = localStorage.getItem('5S_auditState');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(auditState, parsed);
        
        if (!auditState.site) auditState.site = '';
        
        if (!auditState.auditDate) {
            const dateInput = document.getElementById('auditDate');
            if (dateInput && dateInput.value) {
                auditState.auditDate = dateInput.value;
            } else {
                auditState.auditDate = new Date().toISOString().split('T')[0];
            }
        }
        
        for (let i = 1; i <= 4; i++) {
            if (!auditState.quarters[i]) {
                auditState.quarters[i] = { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} };
            }
            if (!auditState.quarters[i].scoreSet) auditState.quarters[i].scoreSet = {};
            if (!auditState.quarters[i].lastUpdated) auditState.quarters[i].lastUpdated = null;
            if (!auditState.quarters[i].findings) auditState.quarters[i].findings = {};
            
            Object.keys(auditState.quarters[i].scores || {}).forEach(questionId => {
                const score = auditState.quarters[i].scores[questionId];
                if (score !== undefined && !auditState.quarters[i].scoreSet[questionId]) {
                    auditState.quarters[i].scoreSet[questionId] = true;
                }
            });
        }
    } else {
        for (let i = 1; i <= 4; i++) {
            auditState.quarters[i] = { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} };
        }
        auditState.site = '';
        const dateInput = document.getElementById('auditDate');
        if (dateInput && dateInput.value) {
            auditState.auditDate = dateInput.value;
        } else {
            auditState.auditDate = new Date().toISOString().split('T')[0];
        }
    }
}

// ===== PHOTO EVIDENCE FUNCTIONS =====

function exportPhotoList() {
    try {
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
                            categoryInfo = { category: category, subcategory: subcat };
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
        
        const modalContent = generatePhotoModalContent(photoData);
        showPhotoReportModal(modalContent);
    } catch (error) {
        console.error('Error generating photo report:', error);
        alert('Error generating photo report: ' + error.message);
    }
}

function generatePhotoModalContent(photoData) {
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    const grouped = {};
    
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) grouped[catId] = { category: item.category, items: [] };
        grouped[catId].items.push(item);
    });
    
    const categoryOrder = ['Sort', 'Systematize', 'Sweep', 'Standardize', 'Self-Discipline'];
    const sortedCategoryIds = Object.keys(grouped).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
    
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    }) : 'Not set';
    
    let html = `
    <div class="photo-report-modal">
        <div class="photo-report-header">
            <h2><i class="fas fa-images"></i> 5S Audit Photo Evidence Report</h2>
            <div style="display: flex; gap: 10px;">
                <button onclick="exportPhotoTableToExcel()" style="background: #27ae60; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
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
                    <span class="audit-date-badge"><i class="fas fa-calendar"></i> Audit Date: ${displayDate}</span>
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
    
    sortedCategoryIds.forEach(catId => {
        const group = grouped[catId];
        const category = group.category;
        
        html += `
            <div class="category-section" style="margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div class="category-title" style="background: ${category.color}; padding: 12px 15px; color: white; font-weight: bold; display: flex; justify-content: space-between;">
                    <span><i class="${category.icon}"></i> ${category.id} - ${category.title}</span>
                    <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px;">${group.items.length} photo(s)</span>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f5f5f5;">
                            <th style="padding: 10px; text-align: left; width: 50%;">Findings based on 5S Action Plan</th>
                            <th style="padding: 10px; text-align: left; width: 50%;">PHOTO EVIDENCE</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            const savedComment = auditState.quarters[item.quarter].comments[item.question.id] || '';
            
            html += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 15px 10px; vertical-align: top;">
                        <textarea id="photo-comment-${item.question.id}-${item.quarter}"
                            placeholder="Enter details, remarks, or action items for this finding..."
                            style="width: 100%; min-height: 100px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"
                            onblur="savePhotoDetails('${item.question.id}', ${item.quarter}, this.value)">${savedComment}</textarea>
                        <div style="margin-top: 8px; font-size: 11px; color: #888;"><strong>Quarter:</strong> ${quarterName}</div>
                    </td>
                    <td style="padding: 15px 10px; text-align: center; vertical-align: middle;">
                        <img src="${item.photo.dataUrl}" 
                             style="max-width: 200px; max-height: 150px; object-fit: contain; border-radius: 5px; cursor: pointer; border: 2px solid #ddd;"
                             onclick="viewFullPhoto('${item.photo.dataUrl}', '${item.question.id}', ${item.quarter})"
                             title="Click to enlarge">
                        <div style="margin-top: 5px; font-size: 11px; color: #666;">${item.photo.fileName}</div>
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

function savePhotoDetails(questionId, quarter, details) {
    auditState.quarters[quarter].comments[questionId] = details;
    saveAuditState();
    
    const textarea = document.getElementById(`photo-comment-${questionId}-${quarter}`);
    if (textarea) {
        const originalBorder = textarea.style.border;
        textarea.style.border = '2px solid #27ae60';
        setTimeout(() => { textarea.style.border = originalBorder || '1px solid #ddd'; }, 500);
    }
}

function exportPhotoTableToExcel() {
    try {
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
                            categoryInfo = { category: category, subcategory: subcat };
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
        
        photoData.sort((a, b) => {
            if (a.category.id !== b.category.id) return a.category.id.localeCompare(b.category.id);
            return a.question.id.localeCompare(b.question.id);
        });
        
        const htmlContent = generateSimplifiedPhotoHTML(photoData);
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

function generateSimplifiedPhotoHTML(photoData) {
    const quarterNames = ['First', 'Second', 'Third', 'Fourth'];
    const displayDate = auditState.auditDate ? new Date(auditState.auditDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    }) : 'Not set';
    
    const grouped = {};
    photoData.forEach(item => {
        const catId = item.category.id;
        if (!grouped[catId]) grouped[catId] = { category: item.category, items: [] };
        grouped[catId].items.push(item);
    });
    
    const categoryOrder = ['Sort', 'Systematize', 'Sweep', 'Standardize', 'Self-Discipline'];
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
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>5S Photo Evidence Report</title>
<style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 30px; background: #ffffff; }
    h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
    .header-info { background: #f8f9fa; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
    .category-header { background: #34495e; color: white; padding: 12px 15px; font-size: 18px; font-weight: bold; margin-top: 25px; border-radius: 5px 5px 0 0; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
    th { background: #2c3e50; color: white; padding: 12px 10px; text-align: left; font-weight: bold; border: 1px solid #34495e; }
    td { padding: 15px 10px; border: 1px solid #ddd; vertical-align: middle; }
    .photo-cell { text-align: center; background-color: #f9f9f9; }
    .photo-cell img { max-width: 200px; max-height: 150px; object-fit: contain; border-radius: 5px; }
    .details-cell { background-color: white; }
    .meta-info { font-size: 11px; color: #666; margin-top: 5px; }
</style>
</head>
<body>
    <h1>5S AUDIT PHOTO EVIDENCE REPORT</h1>
    <div class="header-info">
        <p><strong>Auditor:</strong> ${auditState.auditor || 'Not Specified'} | <strong>Area:</strong> ${auditState.site || 'Not Specified'} | <strong>Audit Date:</strong> ${displayDate}</p>
        <p><strong>Total Photos:</strong> ${photoData.length} | <strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>
`;
    
    sortedCategoryIds.forEach(catId => {
        const group = grouped[catId];
        const category = group.category;
        
        html += `
    <div class="category-header" style="background: ${category.color};">${category.id} - ${category.title} (${group.items.length} photo(s))</div>
    <table>
        <thead><tr><th style="width: 50%;">Findings based on 5S Action Plan</th><th style="width: 50%;">PHOTO EVIDENCE</th></tr></thead>
        <tbody>
        `;
        
        group.items.forEach(item => {
            const quarterName = quarterNames[item.quarter - 1];
            const comment = auditState.quarters[item.quarter].comments[item.question.id] || '';
            
            html += `
            <tr>
                <td class="photo-cell">
                    <img src="${item.photo.dataUrl}" alt="${item.photo.fileName}">
                    <div class="meta-info">${item.photo.fileName}<br>Q: ${item.question.title} (${quarterName})</div>
                </td>
                <td class="details-cell">
                    <textarea style="width: 100%; min-height: 80px;">${comment}</textarea>
                    <div class="meta-info"><strong>Finding:</strong> ${item.question.text}</div>
                </td>
            </tr>
            `;
        });
        
        html += `</tbody></table>`;
    });
    
    html += `</body></html>`;
    return html;
}

function viewFullPhoto(dataUrl, questionId, quarter) {
    const modalHtml = `
        <div class="photo-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 11000; display: flex; justify-content: center; align-items: center; cursor: pointer;" onclick="this.remove()">
            <div style="background: white; padding: 25px; border-radius: 12px; max-width: 90%; max-height: 90%; overflow: auto;" onclick="event.stopPropagation()">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="margin: 0;"><i class="fas fa-camera"></i> Photo for ${questionId} (Q${quarter})</h3>
                    <button onclick="this.closest('.photo-modal').remove()" style="background: #e74c3c; color: white; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer;">&times;</button>
                </div>
                <img src="${dataUrl}" style="max-width: 100%; max-height: 70vh; display: block; margin: 0 auto; border-radius: 8px;">
            </div>
        </div>
    `;
    const modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    document.body.appendChild(modal.firstElementChild);
}

function showPhotoReportModal(content) {
    const existingModal = document.getElementById('photoReportModal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'photoReportModal';
    modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 11000; display: flex; justify-content: center; align-items: center; overflow: hidden; padding: 20px;`;
    
    const modalWrapper = document.createElement('div');
    modalWrapper.style.cssText = `background: white; width: 95%; max-width: 1400px; height: 90vh; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); display: flex; flex-direction: column;`;
    modalWrapper.innerHTML = content;
    modal.appendChild(modalWrapper);
    document.body.appendChild(modal);
}

function closePhotoReportModal() {
    const modal = document.getElementById('photoReportModal');
    if (modal) modal.remove();
}

function showStatusMessage(message, type = 'info') {
    const statusElement = document.getElementById('statusMessage');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `status-message ${type}`;
        statusElement.style.display = 'block';
        setTimeout(() => { statusElement.style.display = 'none'; }, 3000);
    }
}

function restartAudit() {
    if (confirm('Are you sure you want to restart the audit? This will clear all current data.')) {
        auditState.quarters = {
            1: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} },
            2: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} },
            3: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} },
            4: { scores: {}, comments: {}, photos: [], total: 0, savedToSheet: false, scoreSet: {}, lastUpdated: null, findings: {} }
        };
        loadQuarterContent(auditState.currentQuarter);
        updateSheetSummary();
        saveAuditState();
        showStatusMessage('Audit has been restarted.', 'info');
    }
}

function showOfficeActionPlan() {
    const site = auditState.site || '__________________';
    const auditor = auditState.auditor || '_________________';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const url = `action-plan.html?site=${encodeURIComponent(site)}&auditor=${encodeURIComponent(auditor)}&date=${encodeURIComponent(date)}`;
    window.open(url, '_blank');
}

// ===== OVERVIEW FUNCTION - 4 PAGES =====

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
        
        <div class="page">${generatePage1(auditor, site, auditDate, currentDate)}</div>
        ${generatePage2()}
        <div class="page">${generatePage3(auditor, site, auditDate, currentDate)}</div>
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

function generatePage1(auditor, site, auditDate, currentDate) {
    let remarksData = null;
    let remarks = '';
    let signature = '';
    let quarterAuditors = { Q1: '', Q1Date: '', Q2: '', Q2Date: '', Q3: '', Q3Date: '', Q4: '', Q4Date: '' };
    
    try {
        const savedRemarks = localStorage.getItem('auditRemarksData');
        if (savedRemarks) {
            remarksData = JSON.parse(savedRemarks);
            remarks = remarksData.remarks || '';
            signature = remarksData.signature || '';
            if (remarksData.quarterAuditors) quarterAuditors = remarksData.quarterAuditors;
        }
    } catch (error) { console.error('Error loading remarks:', error); }
    
    return `
    <div class="page">
        <div class="report-header">
            <h1><i class="fas fa-table"></i> 5S AUDIT SUMMARY</h1>
            <h2>All Questions & All Quarters</h2>
        </div>
        <div class="audit-info-section">
            <div class="audit-info-item"><span class="info-label">Audit Site:</span><span class="info-value">${site}</span></div>
        </div>
        <div class="table-container">
            <table>
                <thead><tr><th>Category</th><th>Sub Category</th><th>Q#</th><th>Question / Criteria</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th></tr></thead>
                <tbody>${generateAllQuestionsRows()}</tbody>
            </table>
        </div>
        ${remarks ? `<div class="audit-remarks-print" style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3498db;"><h3><i class="fas fa-comment-dots"></i> Audit Remarks / Findings</h3><p>${remarks.replace(/\n/g, '<br>')}</p></div>` : ''}
        <div class="signature-print" style="margin-top: 20px; padding: 15px; border-top: 1px solid #ddd;">
            <div style="display: flex; justify-content: space-between;">
                <div><div class="signature-line"></div><div class="signature-label">Signature of Auditor</div>${signature ? `<div><strong>Printed Name:</strong> ${signature}</div>` : ''}</div>
                <div><div style="font-size: 14px;"><strong>Date:</strong></div></div>
            </div>
        </div>
        <div class="previous-auditors-print" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h3><i class="fas fa-users"></i> Previous Auditors / Reviewers</h3>
            <table><thead><tr><th style="color: black">Quarter</th><th style="color: black">Auditor Name</th><th style="color: black">Date</th></tr></thead>
            <tbody>
                <tr><td><strong>Q1</strong></td><td>${quarterAuditors.Q1 || '—'}</td><td>${quarterAuditors.Q1Date ? new Date(quarterAuditors.Q1Date).toLocaleDateString() : '—'}</td></tr>
                <tr><td><strong>Q2</strong></td><td>${quarterAuditors.Q2 || '—'}</td><td>${quarterAuditors.Q2Date ? new Date(quarterAuditors.Q2Date).toLocaleDateString() : '—'}</td></tr>
                <tr><td><strong>Q3</strong></td><td>${quarterAuditors.Q3 || '—'}</td><td>${quarterAuditors.Q3Date ? new Date(quarterAuditors.Q3Date).toLocaleDateString() : '—'}</td></tr>
                <tr><td><strong>Q4</strong></td><td>${quarterAuditors.Q4 || '—'}</td><td>${quarterAuditors.Q4Date ? new Date(quarterAuditors.Q4Date).toLocaleDateString() : '—'}</td></tr>
            </tbody>
        </table>
        <div class="page-footer">Page 1 of 4</div>
    </div>
    `;
}

function generatePage2() {
    const sortAvg = parseFloat(document.getElementById('sort-avg')?.textContent || '0');
    const systAvg = parseFloat(document.getElementById('systematize-avg')?.textContent || '0');
    const sweepAvg = parseFloat(document.getElementById('sweep-avg')?.textContent || '0');
    const standAvg = parseFloat(document.getElementById('standardize-avg')?.textContent || '0');
    const discAvg = parseFloat(document.getElementById('discipline-avg')?.textContent || '0');
    const totalAvg = document.getElementById('total-avg')?.textContent || '0.00';
    const annualRating = document.getElementById('annual-rating')?.textContent || 'Not Rated';
    const completionPercent = document.getElementById('completion-percentage')?.textContent || '0% Complete';
    
    return `
    <div class="page">
        <div class="report-header">
            <h1><i class="fas fa-chart-bar"></i> SHEET SUMMARY</h1>
            <h2>5S Performance Report</h2>
        </div>
        <table class="sheet-summary-table">
            <thead><tr><th>5S Categories</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Annual Average</th></tr></thead>
            <tbody>
                <tr><td class="category-name">Sort (Seiri)</td><td>${document.getElementById('sort-q1')?.textContent || '0.00'}</td><td>${document.getElementById('sort-q2')?.textContent || '0.00'}</td><td>${document.getElementById('sort-q3')?.textContent || '0.00'}</td><td>${document.getElementById('sort-q4')?.textContent || '0.00'}</td><td><strong>${sortAvg.toFixed(2)}</strong></td></tr>
                <tr><td class="category-name">Systematize (Seiton)</td><td>${document.getElementById('systematize-q1')?.textContent || '0.00'}</td><td>${document.getElementById('systematize-q2')?.textContent || '0.00'}</td><td>${document.getElementById('systematize-q3')?.textContent || '0.00'}</td><td>${document.getElementById('systematize-q4')?.textContent || '0.00'}</td><td><strong>${systAvg.toFixed(2)}</strong></td></tr>
                <tr><td class="category-name">Sweep (Seiso)</td><td>${document.getElementById('sweep-q1')?.textContent || '0.00'}</td><td>${document.getElementById('sweep-q2')?.textContent || '0.00'}</td><td>${document.getElementById('sweep-q3')?.textContent || '0.00'}</td><td>${document.getElementById('sweep-q4')?.textContent || '0.00'}</td><td><strong>${sweepAvg.toFixed(2)}</strong></td></tr>
                <tr><td class="category-name">Standardize (Seiketsu)</td><td>${document.getElementById('standardize-q1')?.textContent || '0.00'}</td><td>${document.getElementById('standardize-q2')?.textContent || '0.00'}</td><td>${document.getElementById('standardize-q3')?.textContent || '0.00'}</td><td>${document.getElementById('standardize-q4')?.textContent || '0.00'}</td><td><strong>${standAvg.toFixed(2)}</strong></td></tr>
                <tr><td class="category-name">Self-Discipline (Shitsuke)</td><td>${document.getElementById('discipline-q1')?.textContent || '0.00'}</td><td>${document.getElementById('discipline-q2')?.textContent || '0.00'}</td><td>${document.getElementById('discipline-q3')?.textContent || '0.00'}</td><td>${document.getElementById('discipline-q4')?.textContent || '0.00'}</td><td><strong>${discAvg.toFixed(2)}</strong></td></tr>
                <tr class="total-row"><td><strong>Total Average Score</strong></td><td><strong>${document.getElementById('total-q1')?.textContent || '0.00'}</strong></td><td><strong>${document.getElementById('total-q2')?.textContent || '0.00'}</strong></td><td><strong>${document.getElementById('total-q3')?.textContent || '0.00'}</strong></td><td><strong>${document.getElementById('total-q4')?.textContent || '0.00'}</strong></td><td><strong>${totalAvg}</strong></td></tr>
            </tbody>
        </table>
        <div class="summary-footer">
            <div class="completion-info"><span>${completionPercent}</span><div class="completion-bar"><div class="completion-fill" style="width: ${completionPercent.replace('% Complete', '')}%"></div></div></div>
            <div class="annual-info">Annual Performance: <span>${annualRating}</span></div>
        </div>
        <div class="scoring-summary">
            <h3 style="margin: 30px 0 15px; text-align: center;">5S SCORING SUMMARY</h3>
            <table style="width: 60%; margin: 0 auto;">
                <thead><tr><th>Category</th><th>Annual Average</th><th>Achieved Level</th></tr></thead>
                <tbody>
                    <tr><td>Sort (S1)</td><td>${sortAvg.toFixed(2)}</td><td>${getMaturityLevel(sortAvg)}</td></tr>
                    <tr><td>Systematize (S2)</td><td>${systAvg.toFixed(2)}</td><td>${getMaturityLevel(systAvg)}</td></tr>
                    <tr><td>Sweep (S3)</td><td>${sweepAvg.toFixed(2)}</td><td>${getMaturityLevel(sweepAvg)}</td></tr>
                    <tr><td>Standardize (S4)</td><td>${standAvg.toFixed(2)}</td><td>${getMaturityLevel(standAvg)}</td></tr>
                    <tr><td>Self-Discipline (S5)</td><td>${discAvg.toFixed(2)}</td><td>${getMaturityLevel(discAvg)}</td></tr>
                </tbody>
            </table>
        </div>
        <h1 style="text-align: center; margin: 40px 0 20px;">5S MATURITY LEVEL SUMMARY</h1>
        <table class="sheet-summary-table maturity-table">
            <thead><tr><th>MATURITY LEVEL</th><th>SORT</th><th>SYSTEMATIZE</th><th>SWEEP</th><th>STANDARDIZE</th><th>SELF-DISCIPLINE</th></tr></thead>
            <tbody>${generateMaturityRows(sortAvg, systAvg, sweepAvg, standAvg, discAvg)}</tbody>
        </table>
        <div class="page-footer">Page 2 of 4</div>
    </div>
    `;
}

function generatePage3(auditor, site, auditDate, currentDate) {
    let openCount = 0;
    let categoryFindingsSums = { 'Sort': 0, 'Systematize': 0, 'Sweep': 0, 'Standardize': 0, 'Self-Discipline': 0 };
    
    try {
        const savedData = localStorage.getItem('currentActionPlan');
        if (savedData) {
            const actionPlanData = JSON.parse(savedData);
            if (actionPlanData.tables) {
                actionPlanData.tables.forEach(table => {
                    if (table.rows) {
                        table.rows.forEach(row => {
                            // Status is at index 5 (6th column), not index 7
                            // Check both 'open' value and 'O' text
                            if (row[5]) {
                                const statusValue = row[5].value;
                                if (statusValue === 'open') {
                                    openCount++;
                                }
                            }
                            
                            // Ref Criteria is at index 1, Findings at index 3
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
    } catch (error) { console.error('Error loading action plan data:', error); }
    
    return `
        <div class="report-header">
            <h1><i class="fas fa-clipboard-list"></i> OFFICE 5S ACTION PLAN</h1>
        </div>
        <div style="margin: 20px 0;"><strong>There are ${openCount} open action items.</strong></div>
        <div style="margin: 15px 0;"><strong>There are ${categoryFindingsSums['Sort']} Sort findings, ${categoryFindingsSums['Systematize']} Systematize findings, ${categoryFindingsSums['Sweep']} Sweep findings, ${categoryFindingsSums['Standardize']} Standardize findings, ${categoryFindingsSums['Self-Discipline']} Self-Discipline findings.</strong></div>
        <div style="display: flex; gap: 20px; margin: 15px 0; font-size: 12px;">
            <span><strong>Status:</strong> O - Open | C - Closed</span>
            <span><strong>Categories:</strong> S1 - Sort, S2 - Systematize, S3 - Sweep, S4 - Standardize, S5 - Self-Discipline</span>
        </div>
        ${generateActionPlanTables()}
        <div class="signature-section">
            <div class="signature-label">Acknowledged by:</div>
            <br><br>
            <div class="signature-line"></div>
            <div class="signature-role">5S Point Person</div>
        </div>
        <div class="footer" style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 10px;">
            <p><strong>Office 5S Action Plan</strong> - Generated on: ${currentDate}</p>
        </div>
        <div class="page-footer">Page 3 of 4</div>
    `;
}

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
        <div style="text-align: center; padding: 50px; background: #f8f9fa; border-radius: 8px; margin: 30px 0; border: 1px solid #dee2e6;">
            <i class="fas fa-camera" style="font-size: 42px; color: #6c757d; margin-bottom: 20px;"></i>
            <h3 style="color: #495057; font-size: 13pt;">No Photo Evidence Found</h3>
            <p style="color: #6c757d; font-size: 10pt;">Upload photos by clicking the camera icon next to each question in the audit form.</p>
        </div>
        `;
    } else {
        // Loop through sorted category IDs
        sortedCategoryIds.forEach(catId => {
            const group = grouped[catId];
            const category = group.category;
            
            photoHTML += `
            <div style="margin-bottom: 25px; border: 1px solid #dee2e6; border-radius: 4px; overflow: hidden; page-break-inside: avoid;">
                <div style="background: #2c3e50; padding: 10px 14px;">
                    <strong style="color: white; font-size: 12pt;">${category.id}</strong>
                    <span style="color: white; font-size: 10pt; margin-left: 8px;">- ${category.title}</span>
                    <span style="float: right; background: #dee2e6; padding: 2px 10px; border-radius: 12px; font-size: 9pt; color: #495057;">${group.items.length} photo(s)</span>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #2c3e50;">
                            <th style="padding: 8px 14px; text-align: left; width: 50%; font-weight: 600; font-size: 10pt; color: white;">Findings based on 5S Action Plan</th>
                            <th style="padding: 8px 14px; text-align: left; width: 50%; font-weight: 600; font-size: 10pt; color: white;">PHOTO EVIDENCE</th>
                          </tr>
                    </thead>
                    <tbody>
            `;
            
            group.items.forEach(item => {
                const quarterName = quarterNames[item.quarter - 1];
                const savedComment = auditState.quarters[item.quarter].comments[item.question.id] || '';
                
                photoHTML += `
                        <tr style="border-bottom: 1px solid #f0f0f0;">
                            <td style="padding: 12px 14px; vertical-align: top;">
                                <div style="margin-bottom: 6px; font-size: 10pt; color: #495057;">
                                    <strong>Description:</strong> ${savedComment || 'No description added'}
                                </div>
                                <div style="font-size: 9pt; color: #6c757d;">
                                    <span><strong>Quarter:</strong> ${quarterName}</span> | 
                                    <span><strong>Sub Category:</strong> ${item.subcategory.title}</span> | 
                                    <span><strong>ID:</strong> ${item.question.title}</span>
                                </div>
                              </td>
                            <td style="padding: 12px 14px; text-align: center; vertical-align: middle;">
                                <img src="${item.photo.dataUrl}" 
                                     style="max-width: 200px; max-height: 140px; object-fit: contain; border-radius: 4px; border: 1px solid #dee2e6;"
                                     title="${item.photo.fileName}">
                                <div style="margin-top: 8px; font-size: 9pt; color: #6c757d;">
                                    ${item.photo.fileName}<br>
                                    Uploaded: ${new Date(item.photo.uploadedAt).toLocaleDateString()}
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
    
    // Add summary footer - NO PAGE BREAK BEFORE THIS
    photoHTML += `
    <div style="margin-top: 20px; text-align: center; color: #6c757d; font-size: 9pt; padding: 12px; border-top: 1px solid #dee2e6;">
        <i class="fas fa-camera"></i> 5S Audit Photo Evidence Report<br>
        <span>Audit Site: ${auditState.site || 'Not Specified'} | Audit Date: ${displayDate} | Total Photos: ${photoData.length}</span>
    </div>
    `;
    
    return `
        <div class="report-header">
            <h1><i class="fas fa-images"></i> PHOTO EVIDENCE REPORT</h1>
            <h2>5S Audit Findings Documentation</h2>
        </div>
        
        <div class="audit-info-section" style="margin-bottom: 20px; padding: 10px 15px; background: #f8f9fa; border-radius: 4px; border: 1px solid #dee2e6;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="background: #6c757d; color: white; padding: 4px 14px; border-radius: 20px; font-size: 10pt;">
                    <i class="fas fa-camera"></i> ${photoData.length} Photo${photoData.length !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
        
        ${photoHTML}
        
        <div class="page-footer" style="page-break-before: avoid;">Page 4 of 4</div>
    `;
}

function generateActionPlanTables() {
    let html = '';
    let actionPlanData = null;
    
    try {
        const savedData = localStorage.getItem('currentActionPlan');
        if (savedData) actionPlanData = JSON.parse(savedData);
    } catch (error) { console.error('Error loading action plan data:', error); }
    
    // Get quarter dates from main form
    let quarterDates = {
        'PREVIOUS AUDIT': null,
        'FIRST QUARTER': '',
        'SECOND QUARTER': '',
        'THIRD QUARTER': '',
        'FOURTH QUARTER': ''
    };
    
    try {
        const savedRemarks = localStorage.getItem('auditRemarksData');
        if (savedRemarks) {
            const remarksData = JSON.parse(savedRemarks);
            const qa = remarksData.quarterAuditors || {};
            quarterDates['FIRST QUARTER'] = qa.Q1Date || '';
            quarterDates['SECOND QUARTER'] = qa.Q2Date || '';
            quarterDates['THIRD QUARTER'] = qa.Q3Date || '';
            quarterDates['FOURTH QUARTER'] = qa.Q4Date || '';
        }
    } catch (error) { console.error('Error loading quarter dates:', error); }
    
    if (actionPlanData && actionPlanData.tables) {
        actionPlanData.tables.forEach((table, index) => {
            const title = (table.title || 'Table').toUpperCase();
            const rows = table.rows || [];
            
            // Get the quarter date for this table
            const quarterDate = quarterDates[title] || '';
            
            html += `<div class="section-title">${title}</div>
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
                <tbody>`;
            
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                
                // Get original date value from saved data
                let originalDateValue = row[0]?.value || '';
                
                // OVERRIDE: Use quarter date from main form if available, otherwise use saved date
                let dateValue = quarterDate || originalDateValue;
                
                // Format date for display (dd/mm/yyyy)
                let formattedDate = '';
                if (dateValue && dateValue.includes('-')) {
                    const parts = dateValue.split('-');
                    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                } else if (dateValue) {
                    formattedDate = dateValue;
                } else {
                    formattedDate = '________';
                }
                
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
                
                let targetValue = row[4]?.value || '';
                if (targetValue.includes('-')) {
                    const parts = targetValue.split('-');
                    targetValue = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
                
                let statusValue = row[5]?.value || '';
                statusValue = statusValue === 'open' ? 'O' : (statusValue === 'close' ? 'C' : statusValue);
                
                let forActionValue = row[6]?.value || '';
                const forActionMap = { 'ma': 'Maintenance Unit', 'au': 'Auditee' };
                forActionValue = forActionMap[forActionValue] || forActionValue;
                
                html += `<tr>
                    <td style="text-align: center;">${formattedDate}</td>
                    <td style="text-align: center;">${refValue || '________'}</td>
                    <td>${row[2]?.value || '________'}</td>
                    <td style="text-align: center;">${row[3]?.value || '_'}</td>
                    <td style="text-align: center;">${targetValue || '________'}</td>
                    <td style="text-align: center;">${statusValue || '_'}</td>
                    <td style="text-align: center;">${forActionValue || '________'}</td>
                </tr>`;
            }
            
            if (rows.length === 0) {
                for (let i = 0; i < 2; i++) {
                    html += `<tr>
                        <td style="text-align: center;">________</td>
                        <td style="text-align: center;">________</td>
                        <td>________</td>
                        <td style="text-align: center;">_</td>
                        <td style="text-align: center;">________</td>
                        <td style="text-align: center;">_</td>
                        <td style="text-align: center;">________</td>
                    </tr>`;
                }
            }
            
            html += `</tbody></table>`;
        });
    }
    
    return html;
}

function generateAllQuestionsRows() {
    let rows = '';
    const categoryRowSpans = {};
    const subcategoryRowSpans = {};
    
    // Calculate rowspans for each category (based on total questions in category)
    questionsData.forEach(category => {
        let totalRows = 0;
        category.subcategories.forEach(subcat => {
            totalRows += subcat.questions.length;
        });
        categoryRowSpans[category.id] = totalRows;
    });
    
    // Calculate rowspans for each subcategory
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            subcategoryRowSpans[`${category.id}_${subcat.title}`] = subcat.questions.length;
        });
    });
    
    let currentCategory = '';
    let currentSubcategory = '';
    
    questionsData.forEach(category => {
        category.subcategories.forEach(subcat => {
            subcat.questions.forEach(question => {
                const q1Score = auditState.quarters[1].scores[question.id] || 0;
                const q2Score = auditState.quarters[2].scores[question.id] || 0;
                const q3Score = auditState.quarters[3].scores[question.id] || 0;
                const q4Score = auditState.quarters[4].scores[question.id] || 0;
                
                const isFirstInCategory = (currentCategory !== category.id);
                const isFirstInSubcategory = (currentSubcategory !== subcat.title);
                
                if (isFirstInCategory) {
                    // Show full category title instead of just ID
                    rows += `<td rowspan="${categoryRowSpans[category.id]}" style="vertical-align: top; font-weight: bold; border-right: 1px solid #ddd;">${category.title}</td>`;
                    currentCategory = category.id;
                }
                
                if (isFirstInSubcategory) {
                    rows += `<td rowspan="${subcategoryRowSpans[`${category.id}_${subcat.title}`]}" style="vertical-align: top; font-style: italic;">${subcat.title}</td>`;
                    currentSubcategory = subcat.title;
                }
                
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
        currentCategory = '';
        currentSubcategory = '';
    });
    
    return rows;
}

function generateMaturityRows(sortAvg, systAvg, sweepAvg, standAvg, discAvg) {
    return `
    <tr><td><strong>LEVEL 5<br><span style="font-size: 0.9em;">Focus on Prevention</span></strong></td>
        <td><div class="description-with-check"><span class="description-text">Employees are continually seeking improvement opportunities</span>${sortAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Anyone can walk into the work area and easily locate items. Abnormal conditions are visually obvious and corrective action measures are in place.</span>${systAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Area employees have devised a dependable and documented method of preventive cleaning and maintenance. Work area cleanliness and organization are a way of life.</span>${sweepAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Employees are continually seeking the elimination of waste, all changes are documented and information is shared with employees.</span>${standAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Employees maintain consistent standards in compliance with the 5S program.</span>${discAvg >= 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
    <tr><td><strong>LEVEL 4<br><span style="font-size: 0.9em;">Focus on Consistency</span></strong></td>
        <td><div class="description-with-check"><span class="description-text">A dependable documented method has been established to maintain a work area free of unnecessary items.</span>${sortAvg >= 2.41 && sortAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">A dependable and documented method has been established to recognize, with a visual sweep, if items are out of place or exceed quantity limits.</span>${systAvg >= 2.41 && systAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">5S schedules detailing tasks and responsibilities are understood and practiced.</span>${sweepAvg >= 2.41 && sweepAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Workplace method improvements are visible and understood by all employees.</span>${standAvg >= 2.41 && standAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Checklists exist showing that employees follow through on 5S schedules.</span>${discAvg >= 2.41 && discAvg < 3.21 ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
    <tr><td><strong>LEVEL 3<br><span style="font-size: 0.9em;">Make it Visual</span></strong></td>
        <td><div class="description-with-check"><span class="description-text">All unnecessary items have been removed from the work area.</span>${sortAvg >= 1.61 && sortAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Designated locations are marked to make organization more visible.</span>${systAvg >= 1.61 && systAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">5S schedules detailing tasks and responsibilities are developed and utilized.</span>${sweepAvg >= 1.61 && sweepAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Workplace method improvements are being incorporated and documented.</span>${standAvg >= 1.61 && standAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">5S schedules detailing tasks and responsibilities have been developed and are utilized.</span>${discAvg >= 1.61 && discAvg < 2.41 ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
    <tr><td><strong>LEVEL 2<br><span style="font-size: 0.9em;">Focus on Basics</span></strong></td>
        <td><div class="description-with-check"><span class="description-text">Necessary and unnecessary items are separated.</span>${sortAvg >= 0.81 && sortAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">A designated location has been established for all items.</span>${systAvg >= 0.81 && systAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Workplace areas are cleaned on a regularly scheduled basis.</span>${sweepAvg >= 0.81 && sweepAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Workplace methods are being improved, but changes have not been documented.</span>${standAvg >= 0.81 && standAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">A recognized effort has been made to improve the condition of the work environment.</span>${discAvg >= 0.81 && discAvg < 1.61 ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
    <tr><td><strong>LEVEL 1<br><span style="font-size: 0.9em;">Just Beginning</span></strong></td>
        <td><div class="description-with-check"><span class="description-text">Necessary and unnecessary items are mixed together in the work area.</span>${sortAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Tools, supplies, books and materials are randomly located.</span>${systAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Workplace areas are dirty and disorganized.</span>${sweepAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">No attempt is being made to document or improve current processes.</span>${standAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
        <td><div class="description-with-check"><span class="description-text">Minimal attention is spent on housekeeping.</span>${discAvg < 0.81 ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
    `;
}

function getMaturityLevel(score) {
    if (score >= 3.21) return 'Level 5 - Focus on Prevention';
    if (score >= 2.41) return 'Level 4 - Focus on Consistency';
    if (score >= 1.61) return 'Level 3 - Make it Visual';
    if (score >= 0.81) return 'Level 2 - Focus on Basics';
    return 'Level 1 - Just Beginning';
}

function updateMaturityTable() {
    const container = document.getElementById('maturity-table-container');
    if (container) container.innerHTML = generateMaturityTableWithRightCheckmarks();
}

function generateMaturityTableWithRightCheckmarks() {
    const sortAvg = parseFloat(document.getElementById('sort-avg')?.textContent || '0');
    const systAvg = parseFloat(document.getElementById('systematize-avg')?.textContent || '0');
    const sweepAvg = parseFloat(document.getElementById('sweep-avg')?.textContent || '0');
    const standAvg = parseFloat(document.getElementById('standardize-avg')?.textContent || '0');
    const discAvg = parseFloat(document.getElementById('discipline-avg')?.textContent || '0');
    
    const level5 = { sort: sortAvg >= 3.21, systematize: systAvg >= 3.21, sweep: sweepAvg >= 3.21, standardize: standAvg >= 3.21, discipline: discAvg >= 3.21 };
    const level4 = { sort: sortAvg >= 2.41 && sortAvg < 3.21, systematize: systAvg >= 2.41 && systAvg < 3.21, sweep: sweepAvg >= 2.41 && sweepAvg < 3.21, standardize: standAvg >= 2.41 && standAvg < 3.21, discipline: discAvg >= 2.41 && discAvg < 3.21 };
    const level3 = { sort: sortAvg >= 1.61 && sortAvg < 2.41, systematize: systAvg >= 1.61 && systAvg < 2.41, sweep: sweepAvg >= 1.61 && sweepAvg < 2.41, standardize: standAvg >= 1.61 && standAvg < 2.41, discipline: discAvg >= 1.61 && discAvg < 2.41 };
    const level2 = { sort: sortAvg >= 0.81 && sortAvg < 1.61, systematize: systAvg >= 0.81 && systAvg < 1.61, sweep: sweepAvg >= 0.81 && sweepAvg < 1.61, standardize: standAvg >= 0.81 && standAvg < 1.61, discipline: discAvg >= 0.81 && discAvg < 1.61 };
    const level1 = { sort: sortAvg < 0.81, systematize: systAvg < 0.81, sweep: sweepAvg < 0.81, standardize: standAvg < 0.81, discipline: discAvg < 0.81 };
    
    return `
    <table class="sheet-summary-table maturity-table">
        <thead><tr><th>MATURITY LEVEL</th><th>SORT</th><th>SYSTEMATIZE</th><th>SWEEP</th><th>STANDARDIZE</th><th>SELF-DISCIPLINE</th></tr></thead>
        <tbody>
            <tr><td><strong>LEVEL 5<br><span style="font-size: 0.9em;">Focus on Prevention</span></strong></td>
                <td><div class="description-with-check"><span class="description-text">Employees are continually seeking improvement opportunities</span>${level5.sort ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Anyone can walk into the work area and easily locate items. Abnormal conditions are visually obvious and corrective action measures are in place.</span>${level5.systematize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Area employees have devised a dependable and documented method of preventive cleaning and maintenance.</span>${level5.sweep ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Employees are continually seeking the elimination of waste, all changes are documented and information is shared with employees.</span>${level5.standardize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Employees maintain consistent standards in compliance with the 5S program.</span>${level5.discipline ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
            <tr><td><strong>LEVEL 4<br><span style="font-size: 0.9em;">Focus on Consistency</span></strong></td>
                <td><div class="description-with-check"><span class="description-text">A dependable documented method has been established to maintain a work area free of unnecessary items.</span>${level4.sort ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">A dependable and documented method has been established to recognize, with a visual sweep, if items are out of place or exceed quantity limits.</span>${level4.systematize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">5S schedules detailing tasks and responsibilities are understood and practiced.</span>${level4.sweep ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Workplace method improvements are visible and understood by all employees.</span>${level4.standardize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Checklists exist showing that employees follow through on 5S schedules.</span>${level4.discipline ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
            <tr><td><strong>LEVEL 3<br><span style="font-size: 0.9em;">Make it Visual</span></strong></td>
                <td><div class="description-with-check"><span class="description-text">All unnecessary items have been removed from the work area.</span>${level3.sort ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Designated locations are marked to make organization more visible.</span>${level3.systematize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">5S schedules detailing tasks and responsibilities are developed and utilized.</span>${level3.sweep ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Workplace method improvements are being incorporated and documented.</span>${level3.standardize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">5S schedules detailing tasks and responsibilities have been developed and are utilized.</span>${level3.discipline ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
            <tr><td><strong>LEVEL 2<br><span style="font-size: 0.9em;">Focus on Basics</span></strong></td>
                <td><div class="description-with-check"><span class="description-text">Necessary and unnecessary items are separated.</span>${level2.sort ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">A designated location has been established for all items.</span>${level2.systematize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Workplace areas are cleaned on a regularly scheduled basis.</span>${level2.sweep ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Workplace methods are being improved, but changes have not been documented.</span>${level2.standardize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">A recognized effort has been made to improve the condition of the work environment.</span>${level2.discipline ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
            <tr><td><strong>LEVEL 1<br><span style="font-size: 0.9em;">Just Beginning</span></strong></td>
                <td><div class="description-with-check"><span class="description-text">Necessary and unnecessary items are mixed together in the work area.</span>${level1.sort ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Tools, supplies, books and materials are randomly located.</span>${level1.systematize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Workplace areas are dirty and disorganized.</span>${level1.sweep ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">No attempt is being made to document or improve current processes.</span>${level1.standardize ? '<span class="check-mark-right">✓</span>' : ''}</div></td>
                <td><div class="description-with-check"><span class="description-text">Minimal attention is spent on housekeeping.</span>${level1.discipline ? '<span class="check-mark-right">✓</span>' : ''}</div></td></tr>
        </tbody>
    </table>
    `;
}

function navigateQuarter(direction) {
    let newQuarter = auditState.currentQuarter;
    if (direction === 'prev' && auditState.currentQuarter > 1) newQuarter = auditState.currentQuarter - 1;
    else if (direction === 'next' && auditState.currentQuarter < 4) newQuarter = auditState.currentQuarter + 1;
    else {
        if (auditState.currentQuarter === 1 && direction === 'prev') showStatusMessage('Already at First Quarter', 'info');
        else if (auditState.currentQuarter === 4 && direction === 'next') showStatusMessage('Already at Fourth Quarter', 'info');
        return;
    }
    if (newQuarter !== auditState.currentQuarter) {
        switchQuarter(newQuarter);
        updateQuarterNavDisplay();
        showStatusMessage(`Switched to ${getQuarterName(newQuarter)} Quarter`, 'success');
    }
}

function updateQuarterNavDisplay() {
    const quarterNameElement = document.getElementById('navCurrentQuarter');
    if (quarterNameElement) quarterNameElement.textContent = `${getQuarterName(auditState.currentQuarter)} Quarter`;
}

// ========== AUDIT REMARKS & SIGNATURE FUNCTIONS ==========

function setSignatureDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const signatureDateSpan = document.getElementById('signatureDate');
    if (signatureDateSpan) signatureDateSpan.textContent = formattedDate;
}

function saveAuditRemarks() {
    try {
        const remarks = document.getElementById('auditRemarks')?.value || '';
        const signature = document.getElementById('auditorSignature')?.value || '';
        const signatureDate = document.getElementById('signatureDate')?.textContent || '';
        
        const quarterAuditors = { Q1: '', Q1Date: '', Q2: '', Q2Date: '', Q3: '', Q3Date: '', Q4: '', Q4Date: '' };
        const auditorEntries = document.querySelectorAll('.auditor-entry');
        
        auditorEntries.forEach(entry => {
            const heading = entry.querySelector('h3')?.textContent || '';
            const nameInput = entry.querySelector('.auditor-name');
            const dateInput = entry.querySelector('.auditor-date');
            
            if (heading === 'Q1') { quarterAuditors.Q1 = nameInput?.value || ''; quarterAuditors.Q1Date = dateInput?.value || ''; }
            else if (heading === 'Q2') { quarterAuditors.Q2 = nameInput?.value || ''; quarterAuditors.Q2Date = dateInput?.value || ''; }
            else if (heading === 'Q3') { quarterAuditors.Q3 = nameInput?.value || ''; quarterAuditors.Q3Date = dateInput?.value || ''; }
            else if (heading === 'Q4') { quarterAuditors.Q4 = nameInput?.value || ''; quarterAuditors.Q4Date = dateInput?.value || ''; }
        });
        
        const remarksData = { remarks, signature, signatureDate, quarterAuditors, savedAt: new Date().toISOString() };
        localStorage.setItem('auditRemarksData', JSON.stringify(remarksData));
        if (typeof showStatusMessage === 'function') showStatusMessage('Remarks saved', 'success');
    } catch (error) { console.error('Error saving remarks:', error); }
}

function loadAuditRemarks() {
    try {
        const savedData = localStorage.getItem('auditRemarksData');
        if (savedData) {
            const remarksData = JSON.parse(savedData);
            const remarksTextarea = document.getElementById('auditRemarks');
            if (remarksTextarea) remarksTextarea.value = remarksData.remarks || '';
            const signatureInput = document.getElementById('auditorSignature');
            if (signatureInput) signatureInput.value = remarksData.signature || '';
            const signatureDateSpan = document.getElementById('signatureDate');
            if (signatureDateSpan && remarksData.signatureDate) signatureDateSpan.textContent = remarksData.signatureDate;
            
            if (remarksData.quarterAuditors) {
                const auditorEntries = document.querySelectorAll('.auditor-entry');
                auditorEntries.forEach(entry => {
                    const heading = entry.querySelector('h3')?.textContent || '';
                    const nameInput = entry.querySelector('.auditor-name');
                    const dateInput = entry.querySelector('.auditor-date');
                    
                    if (heading === 'Q1') { if (nameInput) nameInput.value = remarksData.quarterAuditors.Q1 || ''; if (dateInput) dateInput.value = remarksData.quarterAuditors.Q1Date || ''; }
                    else if (heading === 'Q2') { if (nameInput) nameInput.value = remarksData.quarterAuditors.Q2 || ''; if (dateInput) dateInput.value = remarksData.quarterAuditors.Q2Date || ''; }
                    else if (heading === 'Q3') { if (nameInput) nameInput.value = remarksData.quarterAuditors.Q3 || ''; if (dateInput) dateInput.value = remarksData.quarterAuditors.Q3Date || ''; }
                    else if (heading === 'Q4') { if (nameInput) nameInput.value = remarksData.quarterAuditors.Q4 || ''; if (dateInput) dateInput.value = remarksData.quarterAuditors.Q4Date || ''; }
                });
            }
            if (typeof showStatusMessage === 'function') showStatusMessage('Remarks loaded', 'success');
        }
    } catch (error) { console.error('Error loading remarks:', error); }
}

function setupAutoSave() {
    setTimeout(() => {
        const remarksTextarea = document.getElementById('auditRemarks');
        const signatureInput = document.getElementById('auditorSignature');
        if (remarksTextarea) { remarksTextarea.removeEventListener('input', saveAuditRemarks); remarksTextarea.addEventListener('input', saveAuditRemarks); }
        if (signatureInput) { signatureInput.removeEventListener('input', saveAuditRemarks); signatureInput.addEventListener('input', saveAuditRemarks); }
        const auditorsList = document.getElementById('auditorsList');
        if (auditorsList) {
            auditorsList.removeEventListener('input', saveAuditRemarks);
            auditorsList.addEventListener('input', function(e) {
                if (e.target.classList.contains('auditor-name') || e.target.classList.contains('auditor-date')) saveAuditRemarks();
            });
        }
    }, 100);
}

function initRemarksSection() {
    setSignatureDate();
    loadAuditRemarks();
    setupAutoSave();
    setTimeout(() => { loadAuditRemarks(); }, 200);
}

// ===== QUARTERLY AUDITOR FUNCTIONS - ADDED SAFELY =====
// These functions use a SEPARATE localStorage key 'auditRemarksData'
// They do NOT touch your existing '5S_auditState' data

function saveCurrentAuditorToQuarter(auditorName) {
    // This only affects auditRemarksData, not your scores
    const currentQuarter = auditState.currentQuarter;
    const currentDate = document.getElementById('auditDate')?.value || new Date().toISOString().split('T')[0];
    
    let remarksData = {};
    try {
        const savedData = localStorage.getItem('auditRemarksData');
        if (savedData) {
            remarksData = JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Error loading remarks data:', error);
    }
    
    if (!remarksData.quarterAuditors) {
        remarksData.quarterAuditors = {};
    }
    
    if (currentQuarter === 1) {
        remarksData.quarterAuditors.Q1 = auditorName;
        remarksData.quarterAuditors.Q1Date = currentDate;
    } else if (currentQuarter === 2) {
        remarksData.quarterAuditors.Q2 = auditorName;
        remarksData.quarterAuditors.Q2Date = currentDate;
    } else if (currentQuarter === 3) {
        remarksData.quarterAuditors.Q3 = auditorName;
        remarksData.quarterAuditors.Q3Date = currentDate;
    } else if (currentQuarter === 4) {
        remarksData.quarterAuditors.Q4 = auditorName;
        remarksData.quarterAuditors.Q4Date = currentDate;
    }
    
    localStorage.setItem('auditRemarksData', JSON.stringify(remarksData));
    updateQuarterAuditorDisplay(currentQuarter, auditorName, currentDate);
    showStatusMessage(`Auditor saved for ${getQuarterName(currentQuarter)} Quarter`, 'success');
}

function updateQuarterAuditorDisplay(quarter, auditorName, auditDate) {
    const quarterKey = `Q${quarter}`;
    const auditorEntries = document.querySelectorAll('.auditor-entry');
    
    auditorEntries.forEach(entry => {
        const heading = entry.querySelector('h3')?.textContent || '';
        const nameInput = entry.querySelector('.auditor-name');
        const dateInput = entry.querySelector('.auditor-date');
        
        if (heading === quarterKey) {
            if (nameInput) nameInput.value = auditorName || '';
            if (dateInput && auditDate) {
                dateInput.value = auditDate;
            }
        }
    });
}

function loadQuarterAuditorsDisplay() {
    try {
        const savedData = localStorage.getItem('auditRemarksData');
        if (savedData) {
            const remarksData = JSON.parse(savedData);
            if (remarksData.quarterAuditors) {
                const auditorEntries = document.querySelectorAll('.auditor-entry');
                auditorEntries.forEach(entry => {
                    const heading = entry.querySelector('h3')?.textContent || '';
                    const nameInput = entry.querySelector('.auditor-name');
                    const dateInput = entry.querySelector('.auditor-date');
                    
                    if (heading === 'Q1') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q1 || '';
                        if (dateInput && remarksData.quarterAuditors.Q1Date) dateInput.value = remarksData.quarterAuditors.Q1Date;
                    } else if (heading === 'Q2') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q2 || '';
                        if (dateInput && remarksData.quarterAuditors.Q2Date) dateInput.value = remarksData.quarterAuditors.Q2Date;
                    } else if (heading === 'Q3') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q3 || '';
                        if (dateInput && remarksData.quarterAuditors.Q3Date) dateInput.value = remarksData.quarterAuditors.Q3Date;
                    } else if (heading === 'Q4') {
                        if (nameInput) nameInput.value = remarksData.quarterAuditors.Q4 || '';
                        if (dateInput && remarksData.quarterAuditors.Q4Date) dateInput.value = remarksData.quarterAuditors.Q4Date;
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading quarter auditors display:', error);
    }
}

function loadCurrentAuditorForQuarter(quarter) {
    const currentAuditorInput = document.getElementById('currentAuditor');
    if (!currentAuditorInput) return;
    
    const quarterKey = `Q${quarter}`;
    
    try {
        const savedData = localStorage.getItem('auditRemarksData');
        if (savedData) {
            const remarksData = JSON.parse(savedData);
            if (remarksData.quarterAuditors && remarksData.quarterAuditors[quarterKey]) {
                currentAuditorInput.value = remarksData.quarterAuditors[quarterKey];
            } else {
                currentAuditorInput.value = '';
            }
        } else {
            currentAuditorInput.value = '';
        }
    } catch (error) {
        console.error('Error loading current auditor:', error);
    }
}

// ===== QUARTERLY DATE FUNCTIONS - SEPARATE BUT SHARES auditRemarksData =====

function saveCurrentDateToQuarter(dateValue) {
    // This only affects auditRemarksData, not your scores
    const currentQuarter = auditState.currentQuarter;
    const currentAuditor = document.getElementById('currentAuditor')?.value || '';
    
    let remarksData = {};
    try {
        const savedData = localStorage.getItem('auditRemarksData');
        if (savedData) {
            remarksData = JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Error loading remarks data:', error);
    }
    
    if (!remarksData.quarterAuditors) {
        remarksData.quarterAuditors = {};
    }
    
    // Save date to the current quarter
    if (currentQuarter === 1) {
        remarksData.quarterAuditors.Q1Date = dateValue;
        // Preserve existing auditor name if exists
        if (!remarksData.quarterAuditors.Q1 && currentAuditor) {
            remarksData.quarterAuditors.Q1 = currentAuditor;
        }
    } else if (currentQuarter === 2) {
        remarksData.quarterAuditors.Q2Date = dateValue;
        if (!remarksData.quarterAuditors.Q2 && currentAuditor) {
            remarksData.quarterAuditors.Q2 = currentAuditor;
        }
    } else if (currentQuarter === 3) {
        remarksData.quarterAuditors.Q3Date = dateValue;
        if (!remarksData.quarterAuditors.Q3 && currentAuditor) {
            remarksData.quarterAuditors.Q3 = currentAuditor;
        }
    } else if (currentQuarter === 4) {
        remarksData.quarterAuditors.Q4Date = dateValue;
        if (!remarksData.quarterAuditors.Q4 && currentAuditor) {
            remarksData.quarterAuditors.Q4 = currentAuditor;
        }
    }
    
    localStorage.setItem('auditRemarksData', JSON.stringify(remarksData));
    
    // Update the display in Previous Auditors section
    updateQuarterAuditorDisplay(currentQuarter, currentAuditor, dateValue);
    
    // Also update auditState.auditDate for consistency
    auditState.auditDate = dateValue;
    saveAuditState(); // This saves to 5S_auditState separately
    
    showStatusMessage(`Date saved for ${getQuarterName(currentQuarter)} Quarter`, 'success');
}

function loadCurrentDateForQuarter(quarter) {
    const dateInput = document.getElementById('auditDate');
    if (!dateInput) return;
    
    const quarterKey = `Q${quarter}`;
    
    try {
        const savedData = localStorage.getItem('auditRemarksData');
        if (savedData) {
            const remarksData = JSON.parse(savedData);
            if (remarksData.quarterAuditors && remarksData.quarterAuditors[`${quarterKey}Date`]) {
                const savedDate = remarksData.quarterAuditors[`${quarterKey}Date`];
                dateInput.value = savedDate;
                // Also update auditState for consistency
                auditState.auditDate = savedDate;
                saveAuditState();
            } else {
                // If no saved date for this quarter, use today's date
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
                auditState.auditDate = today;
                // Save this date to the quarter
                saveCurrentDateToQuarter(today);
            }
        } else {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
            auditState.auditDate = today;
            saveCurrentDateToQuarter(today);
        }
    } catch (error) {
        console.error('Error loading current date:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRemarksSection);
} else {
    initRemarksSection();
}
window.addEventListener('load', function() { setTimeout(loadAuditRemarks, 100); });