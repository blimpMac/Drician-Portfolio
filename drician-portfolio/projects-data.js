/* Shared, screenshot-backed project catalog. */
window.portfolioProjects=[
  {
    "id": "blockgo",
    "name": "BlockGo",
    "desc": "A grade records management capstone with dedicated Registrar, Faculty, Chairperson and Student interfaces.",
    "url": "https://github.com/blimpMac/Capstone-Project-BlockChain-BlockGo",
    "tags": [
      "React",
      "JavaScript",
      "C# / ASP.NET Core",
      "PostgreSQL",
      "Hyperledger Fabric",
      "IPFS",
      "Docker"
    ],
    "cat": "blockchain",
    "features": "Grade encoding, section management, review and approval, and student grade viewing.",
    "note": "Role interfaces shown with demo profiles; backend services were not running.",
    "screenshots": [
      {
        "src": "assets/projects/blockgo-01-registrar-dashboard.webp",
        "caption": "Registrar Dashboard"
      },
      {
        "src": "assets/projects/blockgo-02-registrar-encoding-period.webp",
        "caption": "Registrar Encoding Period"
      },
      {
        "src": "assets/projects/blockgo-03-faculty-dashboard.webp",
        "caption": "Faculty Dashboard"
      },
      {
        "src": "assets/projects/blockgo-04-chairperson-monitoring-dashboard.webp",
        "caption": "Chairperson Monitoring Dashboard"
      },
      {
        "src": "assets/projects/blockgo-05-student-summary-dashboard.webp",
        "caption": "Student Summary Dashboard"
      }
    ],
    "demo": null,
    "glow": "#ff9f72"
  },
  {
    "id": "survey",
    "name": "Digital Survey System",
    "desc": "A survey application for creating questionnaires, collecting feedback and viewing response analytics.",
    "url": "https://github.com/blimpMac/ASPNet2.0",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "C# / ASP.NET Core",
      "SQL Server",
      "Entity Framework Core",
      "Chart.js"
    ],
    "cat": "web",
    "features": "Admin and Staff workspaces, public surveys, template management and analytics.",
    "note": "Charts and questionnaires shown with sample data.",
    "screenshots": [
      {
        "src": "assets/projects/survey-01-admin-home-dashboard.webp",
        "caption": "Admin Home Dashboard"
      },
      {
        "src": "assets/projects/survey-02-admin-analytics-dashboard.webp",
        "caption": "Admin Analytics Dashboard"
      },
      {
        "src": "assets/projects/survey-03-staff-home-dashboard.webp",
        "caption": "Staff Home Dashboard"
      },
      {
        "src": "assets/projects/survey-04-staff-survey-management.webp",
        "caption": "Staff Survey Management"
      },
      {
        "src": "assets/projects/survey-05-public-respondent.webp",
        "caption": "Public Respondent"
      }
    ],
    "demo": null,
    "glow": "#a77bff"
  },
  {
    "id": "library",
    "name": "Library Management System",
    "desc": "An academic library application for maintaining books, recording borrowing and returns, and monitoring library activity.",
    "url": "https://github.com/blimpMac/FinalProjectForASPNET",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "C# / ASP.NET Core",
      "SQL Server",
      "Entity Framework Core",
      "Chart.js"
    ],
    "cat": "system",
    "features": "Admin book management, Staff borrowing and return lookups, and a library statistics dashboard.",
    "note": "Statistics shown with sample data. Transaction workflows require the backend.",
    "screenshots": [
      {
        "src": "assets/projects/library-01-admin-statistics-dashboard.webp",
        "caption": "Admin Statistics Dashboard"
      },
      {
        "src": "assets/projects/library-02-admin-book-management.webp",
        "caption": "Admin Book Management"
      },
      {
        "src": "assets/projects/library-03-admin-update-delete.webp",
        "caption": "Admin Update Delete"
      },
      {
        "src": "assets/projects/library-04-staff-borrowing-workspace.webp",
        "caption": "Staff Borrowing Workspace"
      },
      {
        "src": "assets/projects/library-05-staff-return-records.webp",
        "caption": "Staff Return Records"
      }
    ],
    "demo": null,
    "glow": "#64e3c3"
  },
  {
    "id": "messenger",
    "name": "React MessengerStyle",
    "desc": "A Messenger-inspired React interface with General, Gaming and Support channels and local chatbot replies.",
    "url": "https://github.com/blimpMac/React-MessengerStyle",
    "tags": [
      "React",
      "JavaScript",
      "CSS"
    ],
    "cat": "web",
    "features": "Channel switching, separate in-session histories, message composition and simulated typing.",
    "note": "Local frontend prototype. Replies use templates; messages do not persist after a reload.",
    "screenshots": [
      {
        "src": "assets/projects/messenger-01-general-workspace.webp",
        "caption": "General Workspace"
      },
      {
        "src": "assets/projects/messenger-02-gaming-channel.webp",
        "caption": "Gaming Channel"
      },
      {
        "src": "assets/projects/messenger-03-support-channel.webp",
        "caption": "Support Channel"
      },
      {
        "src": "assets/projects/messenger-04-conversation.webp",
        "caption": "Conversation"
      }
    ],
    "demo": null,
    "glow": "#6f8cff"
  }
];
window.portfolioProjects.push(...[
  {
    "id": "accounting-calculator",
    "name": "Accounting Calculator (APT / EWT)",
    "level": "minor",
    "desc": "A compact Python desktop calculator for accounts payable trade, expanded withholding tax and VAT calculations.",
    "url": "https://github.com/blimpMac/Accounting-Calculator",
    "tags": [
      "Python",
      "Tkinter",
      "Decimal",
      "PyInstaller"
    ],
    "cat": "desktop",
    "features": "Convert check amount to APT or APT to check amount, select 1% or 2% EWT, calculate input VAT and VAT-exclusive amount, and switch light/dark theme.",
    "note": "Source-based visual preview of the native Tkinter interface, not a screenshot of the running Windows application. Example values are illustrative.",
    "previewNotice": "UI recreation based on the project's Tkinter source (not a captured application screenshot). Example calculation shown.",
    "screenshots": [
      {
        "src": "assets/projects/accounting-calculator-light.svg",
        "caption": "Accounting Calculator — light theme (source-based preview)"
      },
      {
        "src": "assets/projects/accounting-calculator-dark.svg",
        "caption": "Accounting Calculator — dark theme (source-based preview)"
      }
    ],
    "demo": null,
    "glow": "#77aeff"
  },
  {
    "id": "faculty-attendance",
    "name": "Faculty Attendance System",
    "level": "minor",
    "desc": "A Python desktop tool for faculty check-in/check-out, record management and attendance reports.",
    "url": "https://github.com/blimpMac/PythonFinals",
    "tags": [
      "Python",
      "Tkinter",
      "SQL Server",
      "pyodbc",
      "Matplotlib"
    ],
    "cat": "desktop",
    "features": "Faculty ID check-in/check-out, faculty registration, attendance report table and analytics with a Microsoft SQL Server database.",
    "note": "Source-based visual recreation of the main attendance and reports screens. A live SQL Server database was not connected.",
    "previewNotice": "UI recreation based on the project's Tkinter source (not a captured application screenshot). Report data is intentionally empty.",
    "screenshots": [
      {
        "src": "assets/projects/faculty-attendance-main.svg",
        "caption": "Faculty Attendance — check-in screen (source-based preview)"
      },
      {
        "src": "assets/projects/faculty-attendance-reports.svg",
        "caption": "Faculty Attendance — reports screen (source-based preview)"
      }
    ],
    "demo": null,
    "glow": "#3a86ff"
  }
]);
window.portfolioProjects.forEach(project => { project.level = project.level || (project.id === "messenger" ? "minor" : "major"); });
window.portfolioSnippets = {
  "blockgo": {
    "path": "frontend/src/components/faculty/EncodingBanner.jsx",
    "language": "jsx",
    "source": "import React from \"react\";\n\nconst EncodingBanner = ({ bannerState, daysLeft, formatDate, startDate, endDate }) => {\n  if (bannerState === \"closed_after\") {\n    return (\n      <div className=\"mx-6 mt-5 rounded-xl border-l-4 border-slate-400 bg-slate-100 px-5 py-4 text-slate-600\">\n        <strong className=\"block text-slate-700\">\n          Grade Encoding Period is currently Closed\n        </strong>\n        <p className=\"mt-1 text-sm\">\n          The encoding deadline has passed as of{\" \"}\n          <strong>{formatDate(endDate)}</strong>. Contact or visit the Registrar&apos;s\n          Office for any concerns.\n        </p>\n      </div>\n    );\n  }\n\n  if (bannerState === \"closed_before\") {\n    return (\n      <div className=\"mx-6 mt-5 rounded-xl border-l-4 border-slate-400 bg-white px-5 py-4 text-slate-600 shadow-sm\">\n        <strong className=\"block text-slate-700\">\n          Grade Encoding Period has not started yet\n        </strong>\n        <p className=\"mt-1 text-sm\">\n          Encoding opens on <strong>{formatDate(startDate)}</strong>. Please check back then.\n        </p>\n      </div>\n    );\n  }",
    "url": "https://github.com/blimpMac/Capstone-Project-BlockChain-BlockGo/blob/main/frontend/src/components/faculty/EncodingBanner.jsx"
  },
  "survey": {
    "path": "Controllers/SurveyAnalyticsController.cs",
    "language": "csharp",
    "source": "public SurveyAnalyticsController(AspnetfpDbContext context)\n    {\n        _context = context;\n    }\n    \n    [HttpGet(\"{surveyTemplateId}\")]\n    public async Task<ActionResult<SpecificSurveyAnalyticsDto>> GetSpecificSurveyAnalytics(int surveyTemplateId)\n    {\n        var template = await _context.Set<SurveyTemplate>()\n            .Include(t => t.Questions)\n            .AsNoTracking()\n            .FirstOrDefaultAsync(t => t.SurveyTemplateID == surveyTemplateId);\n\n        if (template == null)\n        {\n            return NotFound(new { message = $\"Survey template ID {surveyTemplateId} not found.\" });\n        }\n        \n        var relevantSurveyResponses = await _context.Set<SurveyResponse>()\n            .Include(sr => sr.Question)\n            .Include(sr => sr.Survey!)\n                .ThenInclude(s => s.SurveyAnalysis)\n            .Where(sr => sr.Question.SurveyTemplateID == surveyTemplateId)\n            .AsNoTracking()\n            .ToListAsync();\n        \n        var allSubmittedSurveys = relevantSurveyResponses\n            .Select(r => r.Survey!)\n            .GroupBy(s => s.SurveyId)\n            .Select(g => g.First())\n            .ToList();\n            \n        var totalResponses = allSubmittedSurveys.Count;\n\n        if (totalResponses == 0)\n        {",
    "url": "https://github.com/blimpMac/ASPNet2.0/blob/main/Controllers/SurveyAnalyticsController.cs"
  },
  "library": {
    "path": "Controllers/BooksController.cs",
    "language": "csharp",
    "source": "_context = context;\n        _mapper = mapper;\n    }\n\n    [HttpGet]\n    public async Task<ActionResult<IEnumerable<BookDTO_ReadDTO>>> GetBooks()\n    {\n        var books = await _context.BookTbls.ToListAsync();\n        return _mapper.Map<List<BookDTO_ReadDTO>>(books);\n    }\n\n    [HttpGet(\"{isbn}\")]\n    public async Task<ActionResult<BookDTO_ReadDTO>> GetBookByIsbn(string isbn)\n    {\n        var book = await _context.BookTbls.FindAsync(isbn);\n        if (book == null) return NotFound();\n        return _mapper.Map<BookDTO_ReadDTO>(book);\n    }\n\n    [HttpPost]\n    public async Task<ActionResult<BookDTO_ReadDTO>> PostBook(BookDTO_CreateDTO dto)\n    {\n        if (await _context.BookTbls.AnyAsync(b => b.Isbnnumber == dto.ISBNNumber))\n            return Conflict($\"Book with ISBN {dto.ISBNNumber} already exists.\");\n\n        var newBook = _mapper.Map<BookTbl>(dto);\n        newBook.Availability = \"Available\";\n        newBook.DatePublished = DateOnly.FromDateTime(DateTime.Now);\n        newBook.PrintedYear = DateTime.Now.Year;\n        newBook.PrintedBy = \"Not Specified\";\n\n        _context.BookTbls.Add(newBook);\n        await _context.SaveChangesAsync();\n\n        var readDto = _mapper.Map<BookDTO_ReadDTO>(newBook);",
    "url": "https://github.com/blimpMac/FinalProjectForASPNET/blob/main/Controllers/BooksController.cs"
  },
  "messenger": {
    "path": "src/App.jsx",
    "language": "jsx",
    "source": "import React, { useState } from 'react';\nimport './index.css';\n\n// Local AI Response Generator - Natural conversation without internet\nconst generateAIResponse = async (userMessage, chatType, conversationHistory) => {\n  // Simulate thinking delay for natural feel\n  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 800));\n  \n  return generateLocalResponse(userMessage, chatType, conversationHistory);\n};\n\n// Natural conversation patterns for different chat types\nconst generateLocalResponse = (userMessage, chatType, history = []) => {\n  const msg = userMessage.toLowerCase().trim();",
    "url": "https://github.com/blimpMac/React-MessengerStyle/blob/main/src/App.jsx"
  }
};

Object.assign(window.portfolioSnippets, {
  "accounting-calculator": {
    "path": "apt_calculator.py",
    "language": "python",
    "source": "def build_result_summary(amount: Decimal, ewt_rate: str, mode: str) -> dict:\n    rate = get_ewt_rate(ewt_rate)\n    q = Decimal('0.01')\n\n    if mode == 'Check Amount to APT':\n        apt = amount / (Decimal('1') - rate)\n        ewt = apt * rate\n        net_check = amount\n    else:\n        apt = amount\n        ewt = apt * rate\n        net_check = apt - ewt\n\n    apt = apt.quantize(q, rounding=ROUND_HALF_UP)\n    ewt = ewt.quantize(q, rounding=ROUND_HALF_UP)\n    net_check = net_check.quantize(q, rounding=ROUND_HALF_UP)\n    input_vat = (apt * Decimal('12') / Decimal('112')).quantize(q, rounding=ROUND_HALF_UP)\n    amount_less_vat = (apt / Decimal('1.12')).quantize(q, rounding=ROUND_HALF_UP)\n\n    return {\n        'apt': apt,\n        'ewt': ewt,\n        'input_vat': input_vat,\n        'amount_less_vat': amount_less_vat,\n        'net_check': net_check,\n    }",
    "url": "https://github.com/blimpMac/Accounting-Calculator/blob/master/apt_calculator.py"
  },
  "faculty-attendance": {
    "path": "attendance_app.py",
    "language": "python",
    "source": "def record(self, action):\n        fid = self.id_entry.get().strip()\n        if not fid:\n            messagebox.showwarning(\"Input Error\", \"Please enter Faculty ID.\")\n            return\n        f = self.controller.db_manager.load_faculty_info(fid)\n        if not f:\n            messagebox.showerror(\"Error\", f\"Faculty '{fid}' not found.\")\n            return\n        sql = \"INSERT INTO dbo.Attendance (FacultyID, Action, TimeStamp) VALUES (?, ?, ?)\"\n        ok, res = self.controller.db_manager.execute_non_query(sql, (fid, action, datetime.now()))\n        if ok:\n            messagebox.showinfo(\"Success\", f\"{f.full_name} successfully marked for {action}.\")\n        else:\n            messagebox.showerror(\"Error\", f\"DB Error: {res}\")\n        self.id_entry.delete(0, tk.END)",
    "url": "https://github.com/blimpMac/PythonFinals/blob/main/attendance_app.py"
  }
});
