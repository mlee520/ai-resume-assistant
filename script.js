// AI求职智能体前端交互脚本
document.addEventListener('DOMContentLoaded', function() {
    // ==================== 全局变量 ====================
    const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/api';
    
    // 模拟数据作为回退
    const sampleParseData = {
        "基本信息": {
            "姓名": "赵日新",
            "性别": "男",
            "年龄": 35,
            "工作年限": "12年",
            "当前职位": "渠道开发经理",
            "所在城市": "上海"
        },
        "求职意向": {
            "期望职位": "渠道开发总监/高级渠道经理",
            "期望城市": "上海、北京、深圳",
            "期望薪资": "面议",
            "到岗时间": "一个月内"
        },
        "工作经历": [
            {
                "公司": "ABC科技有限公司",
                "职位": "渠道开发经理",
                "时间": "2020.03-至今",
                "职责": [
                    "负责华东地区渠道合作伙伴的开发与管理",
                    "制定渠道销售策略，完成年度销售目标",
                    "建立并维护与重点客户的战略合作关系"
                ]
            },
            {
                "公司": "XYZ集团",
                "职位": "渠道主管",
                "时间": "2016.08-2020.02",
                "职责": [
                    "管理团队10人，负责渠道开拓与维护",
                    "参与公司渠道政策制定与优化",
                    "完成年度渠道销售业绩增长35%"
                ]
            }
        ],
        "教育背景": [
            {
                "学校": "上海交通大学",
                "专业": "市场营销",
                "学历": "本科",
                "时间": "2009.09-2013.06"
            }
        ],
        "技能标签": [
            "渠道管理", "合作伙伴开发", "销售策略", "团队管理", 
            "市场分析", "商务谈判", "客户关系管理"
        ]
    };
    
    const sampleOptimization = {
        before: `# 销售经理简历（优化前）

## 工作经历
- 负责销售团队管理
- 完成销售指标
- 开发新客户
- 维护老客户关系

## 技能
- 销售技巧
- 客户沟通
- 团队协作`,
        after: `# 销售经理简历（优化后）

## 工作经历
### 高级销售经理 | ABC科技公司 | 2020.03-至今
- 领导15人销售团队，年均完成销售额1.2亿元，超额完成年度目标35%
- 制定数据驱动的销售策略，通过客户分层管理提升大客户贡献率40%
- 建立销售培训体系，新人销售代表平均成单周期缩短至45天

### 销售主管 | XYZ集团 | 2017.08-2020.02
- 管理8人销售团队，连续三年达成区域销售冠军，年复合增长率28%
- 开拓华东地区新市场，新增战略客户12家，贡献年销售额超3000万元
- 优化销售流程，通过CRM系统精细化跟踪客户生命周期，转化率提升25%

## 核心技能
- **战略销售规划**：基于市场数据分析制定销售策略与目标分解
- **大客户关系管理**：建立并维护关键客户战略合作伙伴关系
- **团队领导与培训**：构建高效销售团队，培养销售人才梯队
- **数据分析与决策**：运用CRM与BI工具进行销售数据洞察与优化`
    };
    
    const sampleGeneratedResume = `# AI生成简历示例

## 基本信息
- **姓名**：李明
- **年龄**：28岁
- **目标岗位**：产品经理
- **工作年限**：5年
- **联系方式**：example@email.com | 138****1234

## 工作经历
### 高级产品经理 | 创新科技公司 | 2021.08-至今
- 负责公司核心产品线规划与迭代，主导产品从0到1上线，实现月活用户从0增长至50万
- 搭建产品数据分析体系，通过用户行为分析优化产品功能，关键功能使用率提升40%
- 协调设计、研发、运营团队，建立敏捷开发流程，产品迭代周期缩短30%

### 产品经理 | 数字解决方案公司 | 2019.06-2021.07
- 负责B端SaaS产品设计与优化，服务企业客户超200家，客户满意度评分4.8/5.0
- 主导产品需求调研与分析，通过用户访谈与竞品分析明确产品差异化定位
- 管理产品需求文档与原型设计，确保产品功能与业务目标高度对齐

## 教育背景
### 硕士 | 计算机科学与技术 | 清华大学 | 2017.09-2019.06
- GPA: 3.8/4.0，校级优秀毕业生
- 研究方向：人机交互与用户体验设计

## 核心技能
- **产品规划与策略**：市场分析、竞品研究、产品路线图制定
- **用户体验设计**：用户研究、原型设计、可用性测试
- **数据分析**：A/B测试、用户行为分析、数据驱动决策
- **项目管理**：敏捷开发、跨团队协作、资源协调
- **技术理解**：熟悉前后端技术原理，与技术团队高效沟通`;

    // ==================== DOM元素 ====================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const resumeFileInput = document.getElementById('resumeFile');
    const parsePreview = document.getElementById('parsePreview');
    const beforeContent = document.getElementById('beforeContent');
    const afterContent = document.getElementById('afterContent');
    const generateForm = document.getElementById('generateForm');
    const generatedResume = document.getElementById('generatedResume');
    const caseLinks = document.querySelectorAll('.case-link');
    const caseModal = document.getElementById('caseModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // ==================== 工具函数 ====================
    
    // 格式化JSON为带语法高亮的HTML
    function formatJSON(obj, indent = 0) {
        let html = '';
        const indentStr = '  '.repeat(indent);
        
        if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                html += '[<br>';
                obj.forEach((item, index) => {
                    html += indentStr + '  ' + formatJSON(item, indent + 1);
                    if (index < obj.length - 1) html += ',';
                    html += '<br>';
                });
                html += indentStr + ']';
            } else {
                html += '{<br>';
                const keys = Object.keys(obj);
                keys.forEach((key, index) => {
                    html += `${indentStr}  <span class="json-key">"${key}"</span>: `;
                    html += formatJSON(obj[key], indent + 1);
                    if (index < keys.length - 1) html += ',';
                    html += '<br>';
                });
                html += indentStr + '}';
            }
        } else if (typeof obj === 'string') {
            html += `<span class="json-string">"${obj}"</span>`;
        } else if (typeof obj === 'number') {
            html += `<span class="json-number">${obj}</span>`;
        } else if (typeof obj === 'boolean') {
            html += `<span class="json-boolean">${obj}</span>`;
        } else if (obj === null) {
            html += `<span class="json-null">null</span>`;
        }
        
        return html;
    }
    
    // 加载真实数据
    async function loadRealData() {
        try {
            // 尝试加载解析结果
            const parseResponse = await fetch('../outputs/demo/解析结果_销售经理.json');
            if (parseResponse.ok) {
                const parseData = await parseResponse.json();
                updateParsePreview(parseData);
            } else {
                updateParsePreview(sampleParseData);
            }
            
            // 尝试加载优化前后内容
            const beforeResponse = await fetch('../outputs/demo/优化后_销售经理.md');
            const afterResponse = await fetch('../outputs/demo/优化后_渠道开发经理.md');
            
            if (beforeResponse.ok && afterResponse.ok) {
                const beforeText = await beforeResponse.text();
                const afterText = await afterResponse.text();
                updateOptimizationContent(beforeText, afterText);
            } else {
                updateOptimizationContent(sampleOptimization.before, sampleOptimization.after);
            }
            
            // 尝试加载生成示例
            const generatedResponse = await fetch('../outputs/demo/生成示例_产品经理.md');
            if (generatedResponse.ok) {
                const generatedText = await generatedResponse.text();
                updateGeneratedResume(generatedText);
            }
            
        } catch (error) {
            console.log('使用模拟数据：', error);
            updateParsePreview(sampleParseData);
            updateOptimizationContent(sampleOptimization.before, sampleOptimization.after);
            updateGeneratedResume(sampleGeneratedResume);
        }
    }
    
    // 更新解析预览
    function updateParsePreview(data) {
        if (!parsePreview) return;
        parsePreview.innerHTML = formatJSON(data);
    }
    
    // 更新优化内容
    function updateOptimizationContent(beforeText, afterText) {
        if (!beforeContent || !afterContent) return;
        
        // 简单的Markdown转换（只处理标题和列表）
        function simpleMarkdown(text) {
            return text
                .replace(/^# (.*$)/gm, '<h4>$1</h4>')
                .replace(/^## (.*$)/gm, '<h5>$1</h5>')
                .replace(/^### (.*$)/gm, '<h6>$1</h6>')
                .replace(/^- (.*$)/gm, '<li>$1</li>')
                .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
                .replace(/\n/g, '<br>');
        }
        
        beforeContent.innerHTML = simpleMarkdown(beforeText);
        afterContent.innerHTML = simpleMarkdown(afterText);
    }
    
    // 更新生成的简历
    function updateGeneratedResume(text) {
        // 保存到全局变量，供表单提交时使用
        window.sampleGeneratedResume = text;
    }
    
    // 显示生成的简历
    function displayGeneratedResume(text) {
        if (!generatedResume) return;
        
        function formatResume(text) {
            return text
                .replace(/^# (.*$)/gm, '<h3>$1</h3>')
                .replace(/^## (.*$)/gm, '<h4>$1</h4>')
                .replace(/^### (.*$)/gm, '<h5>$1</h5>')
                .replace(/^- (.*$)/gm, '<li>$1</li>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br>');
        }
        
        generatedResume.innerHTML = `<div class="resume-content">${formatResume(text)}</div>`;
        generatedResume.classList.add('active');
        
        // 滚动到生成的简历区域
        generatedResume.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // 调用真实API解析简历
    async function parseResumeAPI(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch(`${API_BASE_URL}/parse`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('API解析失败');
            }
        } catch (error) {
            console.error('API调用错误:', error);
            return null;
        }
    }
    
    // 调用真实API生成简历
    async function generateResumeAPI(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                return await response.text();
            } else {
                throw new Error('API生成失败');
            }
        } catch (error) {
            console.error('API调用错误:', error);
            return null;
        }
    }
    
    // ==================== 事件处理 ====================
    
    // 标签切换
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新激活按钮
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应面板
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // 上传区域交互
    if (uploadArea && uploadBtn && resumeFileInput) {
        uploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resumeFileInput.click();
        });
        
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#4361ee';
            this.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e9ecef';
            this.style.backgroundColor = '#fafbfc';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e9ecef';
            this.style.backgroundColor = '#fafbfc';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
        
        resumeFileInput.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0]);
            }
        });
    }
    
    // 处理文件上传
    async function handleFileUpload(file) {
        if (!file.name.endsWith('.docx')) {
            alert('请上传DOCX格式的简历文件');
            return;
        }
        
        // 显示上传状态
        uploadArea.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <p>正在解析简历...</p>
            <p class="file-name">${file.name}</p>
        `;
        
        // 尝试调用真实API
        const result = await parseResumeAPI(file);
        
        if (result) {
            // 使用API返回的数据
            updateParsePreview(result);
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                <p>简历解析成功！</p>
                <p class="file-name">${file.name}</p>
                <button class="btn btn-outline" id="resetUpload">上传新文件</button>
            `;
            
            // 重新绑定重置按钮
            document.getElementById('resetUpload').addEventListener('click', function() {
                location.reload();
            });
        } else {
            // 使用模拟数据
            updateParsePreview(sampleParseData);
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                <p>演示模式：使用示例数据</p>
                <p class="file-name">${file.name}（模拟解析）</p>
                <button class="btn btn-outline" id="resetUpload">更换文件</button>
            `;
            
            document.getElementById('resetUpload').addEventListener('click', function(e) {
                e.preventDefault();
                resumeFileInput.click();
            });
        }
    }
    
    // 表单提交 - 生成简历
    if (generateForm) {
        generateForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                age: document.getElementById('age').value,
                position: document.getElementById('position').value,
                experience: document.getElementById('experience').value,
                skills: document.getElementById('skills').value.split(',').map(s => s.trim())
            };
            
            // 显示生成状态
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
            submitBtn.disabled = true;
            
            // 尝试调用真实API
            const result = await generateResumeAPI(formData);
            
            if (result) {
                displayGeneratedResume(result);
            } else {
                // 使用模拟数据，根据表单输入稍作调整
                let resumeText = window.sampleGeneratedResume || sampleGeneratedResume;
                resumeText = resumeText.replace(/李明/g, formData.name);
                resumeText = resumeText.replace(/28岁/g, `${formData.age}岁`);
                resumeText = resumeText.replace(/产品经理/g, formData.position);
                resumeText = resumeText.replace(/5年/g, formData.experience);
                
                displayGeneratedResume(resumeText);
            }
            
            // 恢复按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
    
    // 案例详情模态框
    caseLinks.forEach(link => {
        link.addEventListener('click', function() {
            const caseType = this.getAttribute('data-case');
            showCaseDetails(caseType);
        });
    });
    
    // 显示案例详情
    function showCaseDetails(caseType) {
        let title = '';
        let content = '';
        
        switch(caseType) {
            case 'sales':
                title = '销售经理简历优化案例';
                content = `
                    <h4>优化目标</h4>
                    <p>提升销售经理简历的专业性、数据驱动表述和关键词匹配度，以通过ATS筛选并吸引招聘经理注意。</p>
                    
                    <h4>优化前问题</h4>
                    <ul>
                        <li>描述过于通用，缺乏具体业绩数据支撑</li>
                        <li>关键词匹配度低，未突出销售策略与团队管理能力</li>
                        <li>语言不够专业，可读性有待提升</li>
                    </ul>
                    
                    <h4>优化策略</h4>
                    <ul>
                        <li><strong>数据量化</strong>：为每项工作经历添加具体业绩指标（销售额、增长率、团队规模等）</li>
                        <li><strong>关键词优化</strong>：植入"数据驱动销售策略"、"大客户关系管理"、"销售培训体系"等行业关键词</li>
                        <li><strong>结构化提升</strong>：重新组织工作经历，突出职责与成就的层级关系</li>
                        <li><strong>专业术语</strong>：使用"客户分层管理"、"销售漏斗优化"、"CRM系统"等专业表述</li>
                    </ul>
                    
                    <h4>优化效果</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-value">+30%</div>
                            <div class="metric-label">可读性提升</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">90%</div>
                            <div class="metric-label">关键词匹配度</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">+40%</div>
                            <div class="metric-label">专业术语使用</div>
                        </div>
                    </div>
                    
                    <h4>技术实现</h4>
                    <p>使用OpenAI GPT-4模型进行语义理解和内容优化，结合岗位JD关键词库进行匹配度分析，通过LangChain框架实现多轮优化迭代。</p>
                `;
                break;
                
            case 'channel':
                title = '渠道开发经理简历优化案例';
                content = `
                    <h4>优化目标</h4>
                    <p>将传统渠道管理描述升级为战略级渠道拓展专家表述，突出合作伙伴生态建设和业绩增长能力。</p>
                    
                    <h4>优化前问题</h4>
                    <ul>
                        <li>职责描述停留在基础渠道维护层面</li>
                        <li>缺乏战略层面和生态建设的表述</li>
                        <li>未体现数据驱动的渠道优化能力</li>
                    </ul>
                    
                    <h4>优化策略</h4>
                    <ul>
                        <li><strong>战略升级</strong>：从"渠道管理"到"渠道战略规划与生态建设"</li>
                        <li><strong>生态视角</strong>：强调"合作伙伴生态体系"、"渠道价值网络"等概念</li>
                        <li><strong>数据驱动</strong>：添加"渠道绩效分析"、"合作伙伴分级管理"等数据化表述</li>
                        <li><strong>业绩量化</strong>：量化渠道拓展成果和销售业绩增长</li>
                    </ul>
                    
                    <h4>优化效果</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-value">+33%</div>
                            <div class="metric-label">可读性提升</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">85%</div>
                            <div class="metric-label">关键词匹配度</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-value">+35%</div>
                            <div class="metric-label">战略表述提升</div>
                        </div>
                    </div>
                    
                    <h4>技术实现</h4>
            <p>通过行业知识图谱识别渠道管理领域的关键概念和趋势，结合企业级渠道管理最佳实践库，生成符合高级别岗位要求的优化内容。</p>
                `;
                break;
                
            case 'product':
                title = '产品经理AI生成简历示例';
                content = `
                    <h4>生成说明</h4>
                    <p>本示例展示了AI求职智能体的简历生成能力。用户只需提供基本信息（姓名、年龄、目标岗位、工作年限、核心技能），AI自动补全完整的简历结构。</p>
                    
                    <h4>输入信息</h4>
                    <ul>
                        <li><strong>姓名</strong>：李明</li>
                        <li><strong>年龄</strong>：28岁</li>
                        <li><strong>目标岗位</strong>：产品经理</li>
                        <li><strong>工作年限</strong>：5年</li>
                        <li><strong>核心技能</strong>：产品规划、用户调研、数据分析、团队协作、需求分析、原型设计、项目管理、市场分析</li>
                    </ul>
                    
                    <h4>生成特点</h4>
                    <ul>
                        <li><strong>填空式自动化</strong>：用户只需提供基本信息，AI自动补全完整简历结构</li>
                        <li><strong>岗位适配</strong>：根据目标岗位自动生成相关的工作经历和技能描述</li>
                        <li><strong>专业模板</strong>：遵循行业标准简历格式，确保专业性和可读性</li>
                        <li><strong>模块化生成</strong>：包含基本信息、工作经历、教育背景、技能等标准化模块</li>
                    </ul>
                    
                    <h4>技术实现</h4>
                    <p>基于大语言模型的Few-shot Learning技术，通过少量优质简历样本学习简历结构和内容模式，结合岗位知识库生成符合行业标准的专业简历。</p>
                    
                    <h4>应用场景</h4>
                    <ul>
                        <li>应届生/转行者快速创建第一份专业简历</li>
                        <li>职场人士更新简历模板和表述方式</li>
                        <li>批量生成标准化简历用于招聘系统测试</li>
                    </ul>
                `;
                break;
        }
        
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        caseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭模态框
    modalClose.addEventListener('click', function() {
        caseModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    caseModal.addEventListener('click', function(e) {
        if (e.target === caseModal) {
            caseModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== 面试面板功能 ====================
    
    // 生成面试问题
    async function generateInterviewQuestionsAPI(jdText, questionCount) {
        try {
            const response = await fetch(`${API_BASE_URL}/interview/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jd_text: jdText,
                    question_count: questionCount
                })
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('API生成面试问题失败');
            }
        } catch (error) {
            console.error('API调用错误:', error);
            return null;
        }
    }
    
    // 显示面试问题
    function displayInterviewQuestions(questionsData) {
        const container = document.getElementById('questionsContainer');
        if (!container) return;
        
        if (!questionsData || !questionsData.questions || !questionsData.questions.questions) {
            container.innerHTML = '<div class="error-message">数据格式错误，无法显示面试问题</div>';
            return;
        }
        
        const questions = questionsData.questions.questions;
        let html = '<div class="interview-summary">';
        html += `<p><strong>岗位名称:</strong> ${questionsData.questions.job_title || '未指定'}</p>`;
        html += `<p><strong>问题总数:</strong> ${questionsData.questions.total_questions || questions.length}</p>`;
        html += '</div>';
        
        html += '<div class="questions-list">';
        questions.forEach((q, index) => {
            html += `
            <div class="question-item">
                <div class="question-header">
                    <span class="question-number">问题 ${index + 1}</span>
                    <span class="question-type">${q.question_type || '基础问题'}</span>
                    <span class="question-difficulty ${q.difficulty || '中等'}">${q.difficulty || '中等'}</span>
                </div>
                <div class="question-content">${q.question || '问题内容缺失'}</div>
                <div class="question-answer">
                    <strong>参考答案:</strong> ${q.answer_reference || '暂无参考答案'}
                </div>
                <div class="question-scoring">
                    <strong>评分要点:</strong> ${q.scoring_points ? q.scoring_points.join('，') : '无'}
                </div>
            </div>`;
        });
        html += '</div>';
        
        container.innerHTML = html;
        
        // 滚动到结果区域
        const resultsSection = document.getElementById('interviewResults');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // 设置面试面板事件监听
    function setupInterviewPanel() {
        const generateBtn = document.getElementById('generateInterviewQuestions');
        const jdTextarea = document.getElementById('jdText');
        const questionCountInput = document.getElementById('interviewQuestionCount');
        
        if (!generateBtn || !jdTextarea) return;
        
        generateBtn.addEventListener('click', async function() {
            const jdText = jdTextarea.value.trim();
            if (!jdText) {
                alert('请输入岗位描述');
                return;
            }
            
            const questionCount = parseInt(questionCountInput.value) || 15;
            
            // 显示加载状态
            const originalText = generateBtn.textContent;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
            generateBtn.disabled = true;
            
            // 调用API
            const result = await generateInterviewQuestionsAPI(jdText, questionCount);
            
            if (result && result.success) {
                displayInterviewQuestions(result);
            } else {
                alert(result ? result.error || '生成面试问题失败' : '网络错误，请稍后重试');
            }
            
            // 恢复按钮状态
            generateBtn.textContent = originalText;
            generateBtn.disabled = false;
        });
        
        // 设置示例JD
        const sampleJD = `职位：Python开发工程师

职责：
1. 负责后端系统开发与维护，参与系统架构设计和技术选型
2. 编写高质量、可维护的Python代码，遵循编码规范
3. 使用Django/Flask框架开发RESTful API接口
4. 优化系统性能，解决高并发场景下的技术挑战
5. 与前端、产品团队协作，确保项目按时交付

要求：
1. 3年以上Python开发经验，熟悉常用数据结构和算法
2. 精通Django或Flask框架，了解其核心原理
3. 掌握MySQL/PostgreSQL数据库设计和优化
4. 熟悉Redis、Elasticsearch等常用中间件
5. 具备良好的团队合作精神和沟通能力
6. 有微服务架构经验者优先`;

        jdTextarea.value = sampleJD;
    }
    
    // ==================== 竞争力分析面板功能 ====================
    
    // 竞争力分析API调用
    async function analyzeCompetitivenessAPI(resumeFile, jdText) {
        try {
            const formData = new FormData();
            formData.append('resume_file', resumeFile);
            formData.append('jd_text', jdText);
            
            const response = await fetch(`${API_BASE_URL}/competitiveness/analyze`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('API竞争力分析失败');
            }
        } catch (error) {
            console.error('API调用错误:', error);
            return null;
        }
    }
    
    // 显示竞争力分析结果
    function displayCompetitivenessAnalysis(analysisData) {
        const summaryEl = document.getElementById('analysisSummary');
        const vizEl = document.getElementById('visualizationArea');
        const recEl = document.getElementById('recommendationsArea');
        
        if (!summaryEl || !vizEl || !recEl) return;
        
        if (!analysisData || !analysisData.success) {
            summaryEl.innerHTML = '<div class="error-message">竞争力分析失败</div>';
            return;
        }
        
        const analysis = analysisData.analysis || {};
        const scores = analysis.scores || {};
        const recommendations = analysis.recommendations || [];
        
        // 显示分析摘要
        let summaryHtml = '<div class="analysis-summary-card">';
        summaryHtml += '<h4>匹配度分析</h4>';
        summaryHtml += `<div class="score-grid">`;
        summaryHtml += `<div class="score-item"><span class="score-label">关键词匹配度</span><span class="score-value">${scores.keyword_match || 0}%</span></div>`;
        summaryHtml += `<div class="score-item"><span class="score-label">语义相似度</span><span class="score-value">${scores.semantic_match || 0}%</span></div>`;
        summaryHtml += `<div class="score-item"><span class="score-label">经验匹配度</span><span class="score-value">${scores.experience_match || 0}%</span></div>`;
        summaryHtml += `<div class="score-item"><span class="score-label">综合得分</span><span class="score-value">${scores.overall_score || 0}%</span></div>`;
        summaryHtml += `</div>`;
        summaryHtml += `<p class="summary-text">${analysis.summary || '暂无分析摘要'}</p>`;
        summaryHtml += '</div>';
        
        summaryEl.innerHTML = summaryHtml;
        
        // 显示可视化图表占位符
        let vizHtml = '<div class="visualization-placeholder">';
        vizHtml += '<h4>匹配度可视化分析</h4>';
        vizHtml += '<div class="chart-grid">';
        vizHtml += '<div class="chart-item"><div class="mock-chart radar"></div></div>';
        vizHtml += '<div class="chart-item"><div class="mock-chart bar"></div></div>';
        vizHtml += '</div>';
        vizHtml += '</div>';
        
        vizEl.innerHTML = vizHtml;
        
        // 显示改进建议
        let recHtml = '<div class="recommendations-card">';
        recHtml += '<h4>提升建议</h4>';
        recHtml += '<ul class="recommendations-list">';
        if (recommendations.length > 0) {
            recommendations.forEach(rec => {
                recHtml += `<li><strong>${rec.area || '综合建议'}:</strong> ${rec.suggestion || ''}</li>`;
            });
        } else {
            recHtml += '<li>暂无具体建议</li>';
        }
        recHtml += '</ul>';
        recHtml += '</div>';
        
        recEl.innerHTML = recHtml;
        
        // 滚动到结果区域
        const resultsSection = document.getElementById('competitivenessResults');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // 设置竞争力分析面板事件监听
    function setupCompetitivenessPanel() {
        const analyzeBtn = document.getElementById('analyzeCompetitiveness');
        const resumeFileInput = document.getElementById('competitiveResumeFile');
        const resumeUploadBtn = document.getElementById('competitiveResumeBtn');
        const resumeUploadArea = document.getElementById('competitiveResumeUpload');
        const jdTextarea = document.getElementById('competitiveJdText');
        const useSampleBtn = document.getElementById('useSampleData');
        
        if (!analyzeBtn) return;
        
        // 上传按钮点击事件
        if (resumeUploadBtn && resumeFileInput) {
            resumeUploadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                resumeFileInput.click();
            });
        }
        
        // 文件选择变化事件
        if (resumeFileInput) {
            resumeFileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    resumeUploadArea.innerHTML = `
                        <i class="fas fa-check-circle" style="color: #28a745;"></i>
                        <p>已选择文件</p>
                        <p class="file-name">${fileName}</p>
                        <button class="btn btn-outline" id="changeResumeFile">更换文件</button>
                    `;
                    
                    // 重新绑定更换文件按钮
                    document.getElementById('changeResumeFile').addEventListener('click', function(e) {
                        e.preventDefault();
                        resumeFileInput.click();
                    });
                }
            });
        }
        
        // 分析按钮点击事件
        analyzeBtn.addEventListener('click', async function() {
            const jdText = jdTextarea.value.trim();
            if (!jdText) {
                alert('请输入岗位描述');
                return;
            }
            
            let resumeFile = null;
            if (resumeFileInput && resumeFileInput.files.length > 0) {
                resumeFile = resumeFileInput.files[0];
            } else {
                alert('请上传简历文件或使用示例数据');
                return;
            }
            
            // 显示加载状态
            const originalText = analyzeBtn.textContent;
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 分析中...';
            analyzeBtn.disabled = true;
            
            // 调用API
            const result = await analyzeCompetitivenessAPI(resumeFile, jdText);
            
            if (result && result.success) {
                displayCompetitivenessAnalysis(result);
            } else {
                alert(result ? result.error || '竞争力分析失败' : '网络错误，请稍后重试');
            }
            
            // 恢复按钮状态
            analyzeBtn.textContent = originalText;
            analyzeBtn.disabled = false;
        });
        
        // 使用示例数据按钮
        if (useSampleBtn) {
            useSampleBtn.addEventListener('click', function() {
                // 设置示例JD
                const sampleJD = `职位：高级产品经理
                
职责：
1. 负责公司核心产品线的战略规划与产品路线图制定
2. 领导产品团队完成产品设计、开发、测试和上线全流程
3. 深入用户研究，挖掘用户需求，优化产品功能和用户体验
4. 制定产品指标体系，通过数据分析驱动产品决策和优化
5. 协调跨部门资源，确保产品目标与业务战略高度对齐

要求：
1. 5年以上产品经理经验，有从0到1成功产品案例
2. 精通用户研究、需求分析、产品设计和项目管理方法论
3. 具备出色的数据分析和商业洞察能力
4. 优秀的沟通协调和团队领导能力
5. 有B端SaaS或平台型产品经验者优先`;

                jdTextarea.value = sampleJD;
                alert('示例数据已加载，请上传简历文件进行分析');
            });
        }
    }
    
    // ==================== 求职信生成面板功能 ====================
    
    // 求职信生成API调用
    async function generateCoverLetterAPI(resumeFile, jdText, companyName, jobTitle, templateStyle) {
        try {
            const formData = new FormData();
            formData.append('resume_file', resumeFile);
            formData.append('job_description', jdText);
            if (companyName) formData.append('company_name', companyName);
            if (jobTitle) formData.append('job_title', jobTitle);
            if (templateStyle) formData.append('template_style', templateStyle);
            
            const response = await fetch(`${API_BASE_URL}/cover_letter/generate`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('API求职信生成失败');
            }
        } catch (error) {
            console.error('API调用错误:', error);
            return null;
        }
    }
    
    // 显示求职信生成结果
    function displayCoverLetterResult(coverLetterData) {
        const summaryEl = document.getElementById('coverLetterSummary');
        if (!summaryEl) return;
        
        if (!coverLetterData || !coverLetterData.success) {
            summaryEl.innerHTML = '<div class="error-message">求职信生成失败</div>';
            return;
        }
        
        const coverLetter = coverLetterData.cover_letter || '';
        
        // 格式化求职信显示
        let html = '<div class="cover-letter-content">';
        html += '<h4>生成的求职信</h4>';
        html += '<div class="cover-letter-text">';
        
        // 简单的换行处理
        const formattedText = coverLetter.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html += formattedText;
        
        html += '</div>';
        html += '<div class="cover-letter-actions">';
        html += '<button class="btn btn-outline" id="copyCoverLetterBtn"><i class="fas fa-copy"></i> 复制内容</button>';
        html += '<button class="btn btn-outline" id="downloadCoverLetterBtn"><i class="fas fa-download"></i> 下载为文本</button>';
        html += '</div>';
        html += '</div>';
        
        summaryEl.innerHTML = html;
        
        // 添加复制功能
        const copyBtn = document.getElementById('copyCoverLetterBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                navigator.clipboard.writeText(coverLetter).then(() => {
                    alert('求职信内容已复制到剪贴板');
                }).catch(err => {
                    console.error('复制失败:', err);
                });
            });
        }
        
        // 添加下载功能
        const downloadBtn = document.getElementById('downloadCoverLetterBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                const blob = new Blob([coverLetter], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = '求职信.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
        
        // 滚动到结果区域
        const resultsSection = document.getElementById('coverLetterResults');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // 设置求职信生成面板事件监听
    function setupCoverLetterPanel() {
        const generateBtn = document.getElementById('generateCoverLetter');
        const resumeFileInput = document.getElementById('coverLetterResumeFile');
        const resumeUploadBtn = document.getElementById('coverLetterResumeBtn');
        const resumeUploadArea = document.getElementById('coverLetterResumeUpload');
        const jdTextarea = document.getElementById('coverLetterJdText');
        const companyNameInput = document.getElementById('coverLetterCompanyName');
        const jobTitleInput = document.getElementById('coverLetterJobTitle');
        const templateStyleSelect = document.getElementById('coverLetterTemplateStyle');
        const useSampleBtn = document.getElementById('useSampleCoverLetterData');
        
        if (!generateBtn) return;
        
        // 上传按钮点击事件
        if (resumeUploadBtn && resumeFileInput) {
            resumeUploadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                resumeFileInput.click();
            });
        }
        
        // 文件选择变化事件
        if (resumeFileInput) {
            resumeFileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    resumeUploadArea.innerHTML = `
                        <i class="fas fa-check-circle" style="color: #28a745;"></i>
                        <p>已选择文件</p>
                        <p class="file-name">${fileName}</p>
                        <button class="btn btn-outline" id="changeCoverLetterResumeFile">更换文件</button>
                    `;
                    
                    // 重新绑定更换文件按钮
                    document.getElementById('changeCoverLetterResumeFile').addEventListener('click', function(e) {
                        e.preventDefault();
                        resumeFileInput.click();
                    });
                }
            });
        }
        
        // 生成按钮点击事件
        generateBtn.addEventListener('click', async function() {
            const jdText = jdTextarea.value.trim();
            if (!jdText) {
                alert('请输入岗位描述');
                return;
            }
            
            let resumeFile = null;
            if (resumeFileInput && resumeFileInput.files.length > 0) {
                resumeFile = resumeFileInput.files[0];
            } else {
                alert('请上传简历文件或使用示例数据');
                return;
            }
            
            const companyName = companyNameInput ? companyNameInput.value.trim() : '';
            const jobTitle = jobTitleInput ? jobTitleInput.value.trim() : '';
            const templateStyle = templateStyleSelect ? templateStyleSelect.value : 'auto';
            
            // 显示加载状态
            const originalText = generateBtn.textContent;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
            generateBtn.disabled = true;
            
            // 调用API
            const result = await generateCoverLetterAPI(resumeFile, jdText, companyName, jobTitle, templateStyle);
            
            if (result && result.success) {
                displayCoverLetterResult(result);
            } else {
                alert(result ? result.error || '求职信生成失败' : '网络错误，请稍后重试');
            }
            
            // 恢复按钮状态
            generateBtn.textContent = originalText;
            generateBtn.disabled = false;
        });
        
        // 使用示例数据按钮
        if (useSampleBtn) {
            useSampleBtn.addEventListener('click', function() {
                // 设置示例JD
                const sampleJD = `职位：高级销售经理

职责：
1. 负责制定区域销售战略，达成年度销售目标
2. 领导销售团队开拓新市场，建立并维护大客户关系
3. 分析市场趋势和竞争对手动态，优化销售策略
4. 建立销售培训体系，提升团队专业能力
5. 与市场、产品部门协作，推动产品优化和创新

要求：
1. 8年以上销售经验，3年以上销售管理经验
2. 出色的商业谈判和客户关系管理能力
3. 具备数据分析和市场洞察能力
4. 优秀的团队领导能力和跨部门协作能力
5. 有B2B销售或行业解决方案销售经验者优先`;
                
                jdTextarea.value = sampleJD;
                alert('示例岗位描述已加载，请上传简历文件生成求职信');
            });
        }
    }
    
    // ==================== 转行适配方案面板功能 ====================
    
    // 转行适配方案生成API调用
    async function generateCareerTransitionPlanAPI(resumeFile, targetRole, targetIndustry, learningStyle, weeklyHours) {
        try {
            const formData = new FormData();
            formData.append('resume_file', resumeFile);
            formData.append('target_role', targetRole);
            if (targetIndustry) formData.append('target_industry', targetIndustry);
            formData.append('learning_style', learningStyle);
            formData.append('weekly_study_hours', weeklyHours);
            
            const response = await fetch(`${API_BASE_URL}/career_transition/plan`, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('API转行适配方案生成失败');
            }
        } catch (error) {
            console.error('API调用错误:', error);
            return null;
        }
    }
    
    // 显示转行适配方案结果
    function displayCareerTransitionPlanResult(planData) {
        const summaryEl = document.getElementById('careerTransitionSummary');
        if (!summaryEl) return;
        
        if (!planData || !planData.success) {
            summaryEl.innerHTML = '<div class="error-message">转行适配方案生成失败</div>';
            return;
        }
        
        const plan = planData.plan || {};
        const gapAnalysis = plan.gap_analysis || {};
        const learningPath = plan.learning_path || {};
        const resumeSuggestions = plan.resume_suggestions || [];
        
        let html = '<div class="career-transition-content">';
        html += '<h4>转行适配方案</h4>';
        
        // 差距分析部分
        html += '<div class="gap-analysis-section">';
        html += '<h5>差距分析</h5>';
        html += '<div class="score-grid">';
        if (gapAnalysis.overall_score) {
            html += `<div class="score-item"><span class="score-label">总体匹配度</span><span class="score-value">${gapAnalysis.overall_score}/100</span></div>`;
        }
        if (gapAnalysis.skill_transferability) {
            html += `<div class="score-item"><span class="score-label">技能迁移性</span><span class="score-value">${gapAnalysis.skill_transferability}/100</span></div>`;
        }
        if (gapAnalysis.experience_relevance) {
            html += `<div class="score-item"><span class="score-label">经验相关性</span><span class="score-score-value">${gapAnalysis.experience_relevance}/100</span></div>`;
        }
        html += '</div>';
        
        if (gapAnalysis.skill_gaps && gapAnalysis.skill_gaps.length > 0) {
            html += '<div class="skill-gaps-list">';
            html += '<h6>识别出的技能缺口：</h6>';
            html += '<ul>';
            gapAnalysis.skill_gaps.forEach(skill => {
                html += `<li>${skill}</li>`;
            });
            html += '</ul>';
            html += '</div>';
        }
        html += '</div>';
        
        // 学习路径部分
        html += '<div class="learning-path-section">';
        html += '<h5>学习路径</h5>';
        if (learningPath.recommended_resources && learningPath.recommended_resources.length > 0) {
            html += '<div class="resources-list">';
            html += '<h6>推荐学习资源：</h6>';
            html += '<ul>';
            learningPath.recommended_resources.forEach(resource => {
                html += `<li><a href="${resource.url || '#'}" target="_blank">${resource.title || '资源'}</a> - ${resource.description || ''}</li>`;
            });
            html += '</ul>';
            html += '</div>';
        }
        if (learningPath.timeline) {
            html += `<p><strong>预计学习时间：</strong>${learningPath.timeline}</p>`;
        }
        html += '</div>';
        
        // 简历优化建议部分
        html += '<div class="resume-suggestions-section">';
        html += '<h5>简历优化建议</h5>';
        if (resumeSuggestions.length > 0) {
            html += '<ul>';
            resumeSuggestions.forEach(suggestion => {
                html += `<li><strong>${suggestion.area || '综合建议'}:</strong> ${suggestion.suggestion || ''}</li>`;
            });
            html += '</ul>';
        }
        html += '</div>';
        
        html += '</div>';
        
        summaryEl.innerHTML = html;
        
        // 滚动到结果区域
        const resultsSection = document.getElementById('careerTransitionResults');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // 设置转行适配方案面板事件监听
    function setupCareerTransitionPanel() {
        const generateBtn = document.getElementById('generateCareerTransitionPlan');
        const resumeFileInput = document.getElementById('careerTransitionResumeFile');
        const resumeUploadBtn = document.getElementById('careerTransitionResumeBtn');
        const resumeUploadArea = document.getElementById('careerTransitionResumeUpload');
        const targetRoleInput = document.getElementById('careerTransitionTargetRole');
        const targetIndustryInput = document.getElementById('careerTransitionTargetIndustry');
        const learningStyleSelect = document.getElementById('careerTransitionLearningStyle');
        const weeklyHoursInput = document.getElementById('careerTransitionWeeklyHours');
        const useSampleBtn = document.getElementById('useSampleCareerTransitionData');
        
        if (!generateBtn) return;
        
        // 上传按钮点击事件
        if (resumeUploadBtn && resumeFileInput) {
            resumeUploadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                resumeFileInput.click();
            });
        }
        
        // 文件选择变化事件
        if (resumeFileInput) {
            resumeFileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    resumeUploadArea.innerHTML = `
                        <i class="fas fa-check-circle" style="color: #28a745;"></i>
                        <p>已选择文件</p>
                        <p class="file-name">${fileName}</p>
                        <button class="btn btn-outline" id="changeCareerTransitionResumeFile">更换文件</button>
                    `;
                    
                    // 重新绑定更换文件按钮
                    document.getElementById('changeCareerTransitionResumeFile').addEventListener('click', function(e) {
                        e.preventDefault();
                        resumeFileInput.click();
                    });
                }
            });
        }
        
        // 生成按钮点击事件
        generateBtn.addEventListener('click', async function() {
            const targetRole = targetRoleInput.value.trim();
            if (!targetRole) {
                alert('请输入目标岗位');
                return;
            }
            
            let resumeFile = null;
            if (resumeFileInput && resumeFileInput.files.length > 0) {
                resumeFile = resumeFileInput.files[0];
            } else {
                alert('请上传简历文件或使用示例数据');
                return;
            }
            
            const targetIndustry = targetIndustryInput ? targetIndustryInput.value.trim() : '';
            const learningStyle = learningStyleSelect ? learningStyleSelect.value : 'visual';
            const weeklyHours = weeklyHoursInput ? parseInt(weeklyHoursInput.value) || 10 : 10;
            
            // 显示加载状态
            const originalText = generateBtn.textContent;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';
            generateBtn.disabled = true;
            
            // 调用API
            const result = await generateCareerTransitionPlanAPI(resumeFile, targetRole, targetIndustry, learningStyle, weeklyHours);
            
            if (result && result.success) {
                displayCareerTransitionPlanResult(result);
            } else {
                alert(result ? result.error || '转行适配方案生成失败' : '网络错误，请稍后重试');
            }
            
            // 恢复按钮状态
            generateBtn.textContent = originalText;
            generateBtn.disabled = false;
        });
        
        // 使用示例数据按钮
        if (useSampleBtn) {
            useSampleBtn.addEventListener('click', function() {
                // 设置示例目标岗位
                targetRoleInput.value = '数据科学家';
                if (targetIndustryInput) targetIndustryInput.value = '互联网';
                if (weeklyHoursInput) weeklyHoursInput.value = '12';
                alert('示例数据已加载，请上传简历文件生成转行适配方案');
            });
        }
    }
    
    // ==================== 初始化 ====================
    
    // 加载数据
    loadRealData();
    
    // 初始化所有面板
    setupInterviewPanel();
    setupCompetitivenessPanel();
    setupCoverLetterPanel();
    setupCareerTransitionPanel();
    
    // 初始化显示第一个标签内容
    if (tabPanes.length > 0) {
        tabPanes[0].classList.add('active');
    }
    if (tabBtns.length > 0) {
        tabBtns[0].classList.add('active');
    }
    
    console.log('AI求职智能体前端已初始化，七大核心功能就绪');
});