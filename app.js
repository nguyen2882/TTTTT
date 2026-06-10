/**
 * Core Application Controller for Contract & Debt Tracker
 * Integrates data store, templates, Chart.js visualization, and user events.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE VARIABLES ---
  let currentSortField = "signedDate";
  let currentSortDirection = "desc"; // 'asc' or 'desc'
  
  // Charts references (to destroy before recreation)
  let revenueCostChartInstance = null;
  let costStructureChartInstance = null;
  
  // Active Cost Selected Contract ID
  let activeCostContractId = null;

  // Theme state
  let currentTheme = localStorage.getItem("TTTT_THEME") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // --- ELEMENT SELECTORS ---
  // Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const pageSections = document.querySelectorAll(".page-section");
  
  // Dashboard Metrics
  const valTotalRevenue = document.getElementById("val_total_revenue");
  const valTotalProfit = document.getElementById("val_total_profit");
  const valProfitMargin = document.getElementById("val_profit_margin");
  const valTotalDebt = document.getElementById("val_total_debt");
  const valTotalPaid = document.getElementById("val_total_paid");
  const valOverdueDebt = document.getElementById("val_overdue_debt");
  const urgentDebtTableBody = document.getElementById("urgent_debt_table_body");
  const btnGotoContractsDebt = document.getElementById("btn_goto_contracts_debt");

  // Contract Table View
  const filterSearch = document.getElementById("filter_search");
  const filterStatus = document.getElementById("filter_status");
  const filterStartDate = document.getElementById("filter_start_date");
  const filterEndDate = document.getElementById("filter_end_date");
  const btnResetFilters = document.getElementById("btn_reset_filters");
  const btnOpenAddModal = document.getElementById("btn_open_add_modal");
  const btnExportCSV = document.getElementById("btn_export_csv");
  const btnOpenImportModal = document.getElementById("btn_open_import_modal");
  const contractsTableBody = document.getElementById("contracts_table_body");
  const contractsEmptyState = document.getElementById("contracts_empty_state");
  const contractsHeaders = document.querySelectorAll("#contracts_table th.sortable");

  // Cost Tracking View
  const costSearchInput = document.getElementById("cost_search_input");
  const costContractList = document.getElementById("cost_contract_list");
  const costFormTitle = document.getElementById("cost_form_title");
  const costContractCodeBadge = document.getElementById("cost_contract_code_badge");
  const costRatioText = document.getElementById("cost_ratio_text");
  const costProgressBar = document.getElementById("cost_progress_bar");
  const costInputsForm = document.getElementById("cost_inputs_form");
  const costContractIdHidden = document.getElementById("cost_contract_id_hidden");
  
  const costValMaterials = document.getElementById("cost_val_materials");
  const costValLabor = document.getElementById("cost_val_labor");
  const costValSubcontract = document.getElementById("cost_val_subcontract");
  const costValShipping = document.getElementById("cost_val_shipping");
  const costValMiscellaneous = document.getElementById("cost_val_miscellaneous");
  
  const costTotalCalculated = document.getElementById("cost_total_calculated");
  const costProfitCalculated = document.getElementById("cost_profit_calculated");
  const costTotalSummaryBox = document.getElementById("cost_total_summary_box");
  const btnResetCostInputs = document.getElementById("btn_reset_cost_inputs");

  // Document Generator View
  const docSelectContract = document.getElementById("doc_select_contract");
  const docSelectTemplate = document.getElementById("doc_select_template");
  const docValAddress = document.getElementById("doc_val_address");
  const docValTax = document.getElementById("doc_val_tax");
  const docValRepresentative = document.getElementById("doc_val_representative");
  const docValPosition = document.getElementById("doc_val_position");
  const btnGenerateDocument = document.getElementById("btn_generate_document");
  const btnPrintDocument = document.getElementById("btn_print_document");
  const a4PaperContainer = document.getElementById("a4_paper_container");

  // Modals
  const contractModal = document.getElementById("contract_modal");
  const modalContractTitle = document.getElementById("modal_contract_title");
  const btnCloseContractModal = document.getElementById("btn_close_contract_modal");
  const btnCancelContractModal = document.getElementById("btn_cancel_contract_modal");
  const contractForm = document.getElementById("contract_form");
  
  const contractIdHidden = document.getElementById("contract_id_hidden");
  const formCode = document.getElementById("form_code");
  const formCustomerName = document.getElementById("form_customer_name");
  const formCustomerAddress = document.getElementById("form_customer_address");
  const formCustomerTaxCode = document.getElementById("form_customer_tax_code");
  const formRepresentative = document.getElementById("form_representative");
  const formPosition = document.getElementById("form_position");
  const formSignedDate = document.getElementById("form_signed_date");
  const formDeliveryDate = document.getElementById("form_delivery_date");
  const formDueDate = document.getElementById("form_due_date");
  const formValue = document.getElementById("form_value");
  const formPaidAmount = document.getElementById("form_paid_amount");
  const formStatus = document.getElementById("form_status");
  const formNotes = document.getElementById("form_notes");

  const importModal = document.getElementById("import_modal");
  const btnCloseImportModal = document.getElementById("btn_close_import_modal");
  const btnCancelImportModal = document.getElementById("btn_cancel_import_modal");
  const fileDropZone = document.getElementById("file_drop_zone");
  const filePickerInput = document.getElementById("file_picker_input");
  const importStatusMessage = document.getElementById("import_status_message");
  
  const themeToggler = document.getElementById("theme_toggler");

  // --- UTILITY FUNCTIONS ---
  // Currency Formatter
  function formatVND(num) {
    if (num === undefined || num === null) return "0đ";
    return Number(num).toLocaleString("vi-VN") + "đ";
  }

  // Format Date from YYYY-MM-DD to DD/MM/YYYY
  function formatDateVN(dateStr) {
    if (!dateStr) return "-";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  // Calculate days overdue
  function getDaysOverdue(dueDateStr) {
    if (!dueDateStr) return 0;
    const today = new Date();
    today.setHours(0,0,0,0);
    const due = new Date(dueDateStr);
    due.setHours(0,0,0,0);
    const diffTime = today - due;
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // --- TAB NAVIGATION SYSTEM ---
  function initTabs() {
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        
        tabButtons.forEach(b => b.classList.remove("active"));
        pageSections.forEach(s => s.classList.remove("active"));
        
        btn.classList.add("active");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add("active");
        }

        // Trigger chart redraws or specific view updates when switching tabs
        if (targetId === "section_dashboard") {
          updateDashboard();
        } else if (targetId === "section_contracts") {
          renderContractsTable();
        } else if (targetId === "section_costs") {
          updateCostView();
        } else if (targetId === "section_templates") {
          updateDocumentViewSelectors();
        }
      });
    });

    btnGotoContractsDebt.addEventListener("click", () => {
      document.getElementById("tab_btn_contracts").click();
      filterStatus.value = "debt";
      filterStatus.dispatchEvent(new Event("change"));
    });
  }

  // --- THEME SWITCHER ---
  themeToggler.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("TTTT_THEME", currentTheme);
  });

  // --- DASHBOARD RENDERING ---
  function updateDashboard() {
    const stats = window.store.getStats();
    
    // KPI Cards
    valTotalRevenue.textContent = formatVND(stats.totalRevenue);
    valTotalProfit.textContent = formatVND(stats.netProfit);
    valProfitMargin.textContent = `Tỷ suất lợi nhuận: ${stats.profitMargin.toFixed(1)}%`;
    valTotalDebt.textContent = formatVND(stats.totalDebt);
    valTotalPaid.textContent = `Đã thu: ${formatVND(stats.totalPaid)}`;
    valOverdueDebt.textContent = formatVND(stats.overdueDebt);

    // Render urgent debts list
    renderUrgentDebts();
    
    // Render Dashboard Charts
    renderCharts();
  }

  function renderUrgentDebts() {
    const contracts = window.store.getAll();
    const todayStr = new Date().toISOString().split("T")[0];
    
    // Filter contracts that have outstanding debt (value > paid)
    let urgentList = contracts
      .filter(c => (c.value - c.paidAmount) > 0)
      .map(c => {
        const debt = c.value - c.paidAmount;
        const days = getDaysOverdue(c.dueDate);
        let status = "Trong hạn";
        if (days > 0) status = "Quá hạn";
        else if (c.dueDate) {
          // Check if due in next 15 days
          const diff = (new Date(c.dueDate) - new Date(todayStr)) / (1000*60*60*24);
          if (diff <= 15) status = "Sắp đến hạn";
        }
        return { ...c, debt, daysOverdue: days, urgentStatus: status };
      })
      // Filter only overdue or due in 15 days
      .filter(c => c.urgentStatus === "Quá hạn" || c.urgentStatus === "Sắp đến hạn")
      // Sort by days overdue descending, then by debt value descending
      .sort((a, b) => b.daysOverdue - a.daysOverdue || b.debt - a.debt);

    urgentDebtTableBody.innerHTML = "";
    
    if (urgentList.length === 0) {
      urgentDebtTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">
            <i class="fa-solid fa-circle-check" style="color: var(--color-success); font-size: 1.5rem; margin-bottom: 8px; display: block;"></i>
            Không có khoản nợ quá hạn hoặc sắp đến hạn cần thu.
          </td>
        </tr>
      `;
      return;
    }

    urgentList.forEach(c => {
      const badgeClass = c.urgentStatus === "Quá hạn" ? "badge-overdue" : "badge-warning";
      const daysText = c.daysOverdue > 0 ? `${c.daysOverdue} ngày` : "Chưa quá hạn";
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${c.code}</strong></td>
        <td style="white-space: normal; min-width: 200px;">${c.customerName}</td>
        <td>${formatVND(c.value)}</td>
        <td style="font-weight: 600; color: var(--color-danger);">${formatVND(c.debt)}</td>
        <td>${formatDateVN(c.dueDate)}</td>
        <td style="font-weight: 500;">${daysText}</td>
        <td><span class="badge ${badgeClass}">${c.urgentStatus}</span></td>
      `;
      urgentDebtTableBody.appendChild(tr);
    });
  }

  function renderCharts() {
    const contracts = window.store.getAll();
    const stats = window.store.getStats();
    const costBreakdown = window.store.getCostBreakdown();

    // Chart 1: Revenue vs Cost Comparison for top 6 contracts
    const revenueCostCtx = document.getElementById("chart_revenue_cost").getContext("2d");
    
    // Destroy previous instance
    if (revenueCostChartInstance) {
      revenueCostChartInstance.destroy();
    }

    // Sort contracts by value to show largest ones
    const topContracts = [...contracts]
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    const labels = topContracts.map(c => c.code);
    const revenueData = topContracts.map(c => c.value);
    const costData = topContracts.map(c => {
      return (c.costs.materials || 0) + 
             (c.costs.labor || 0) + 
             (c.costs.subcontract || 0) + 
             (c.costs.shipping || 0) + 
             (c.costs.miscellaneous || 0);
    });

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textThemeColor = isDark ? "#94a3b8" : "#475569";
    const gridThemeColor = isDark ? "#1f2937" : "#e2e8f0";

    revenueCostChartInstance = new Chart(revenueCostCtx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Giá trị hợp đồng (Doanh thu)",
            data: revenueData,
            backgroundColor: "rgba(99, 102, 241, 0.85)", // Indigo
            borderColor: "rgb(99, 102, 241)",
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: "Tổng giá thành (Chi phí)",
            data: costData,
            backgroundColor: "rgba(239, 68, 68, 0.8)", // Rose/Red
            borderColor: "rgb(239, 68, 68)",
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { color: textThemeColor, font: { family: "Outfit" } }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + formatVND(context.raw);
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textThemeColor, font: { family: "Outfit" } }
          },
          y: {
            grid: { color: gridThemeColor },
            ticks: {
              color: textThemeColor,
              font: { family: "Outfit" },
              callback: function(value) {
                return (value / 1000000).toLocaleString() + " Tr";
              }
            }
          }
        }
      }
    });

    // Chart 2: Cost Breakdowns Structure (Doughnut)
    const costStructureCtx = document.getElementById("chart_cost_structure").getContext("2d");
    
    if (costStructureChartInstance) {
      costStructureChartInstance.destroy();
    }

    const totalCostValues = [
      costBreakdown.materials,
      costBreakdown.labor,
      costBreakdown.subcontract,
      costBreakdown.shipping,
      costBreakdown.miscellaneous
    ];

    const hasCosts = totalCostValues.some(v => v > 0);

    costStructureChartInstance = new Chart(costStructureCtx, {
      type: "doughnut",
      data: {
        labels: ["Vật tư", "Nhân công", "Thuê ngoài", "Vận chuyển", "Chi phí khác"],
        datasets: [{
          data: hasCosts ? totalCostValues : [1, 1, 1, 1, 1], // fallback uniform breakdown if empty
          backgroundColor: [
            "rgba(59, 130, 246, 0.85)",  // Blue
            "rgba(16, 185, 129, 0.85)",  // Emerald
            "rgba(139, 92, 246, 0.85)",  // Violet
            "rgba(245, 158, 11, 0.85)",  // Amber
            "rgba(107, 114, 128, 0.85)"   // Gray
          ],
          borderColor: isDark ? "#111827" : "#ffffff",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: { color: textThemeColor, font: { family: "Outfit" } }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                if (!hasCosts) return context.label + ': Chưa có dữ liệu';
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percent = ((context.raw / total) * 100).toFixed(1);
                return context.label + ': ' + formatVND(context.raw) + ' (' + percent + '%)';
              }
            }
          }
        },
        cutout: "60%"
      }
    });
  }

  // --- CONTRACT MANAGEMENT VIEW & CRUD ---
  function renderContractsTable() {
    const keyword = filterSearch.value.trim().toLowerCase();
    const status = filterStatus.value;
    const start = filterStartDate.value;
    const end = filterEndDate.value;
    
    let contracts = window.store.getAll();

    // 1. Apply Filtering
    if (keyword) {
      contracts = contracts.filter(c => 
        c.code.toLowerCase().includes(keyword) ||
        c.customerName.toLowerCase().includes(keyword) ||
        c.notes.toLowerCase().includes(keyword)
      );
    }

    if (status !== "all") {
      contracts = contracts.filter(c => c.status === status);
    }

    if (start) {
      contracts = contracts.filter(c => c.signedDate >= start);
    }

    if (end) {
      contracts = contracts.filter(c => c.signedDate <= end);
    }

    // 2. Apply Sorting
    contracts.sort((a, b) => {
      let aVal = a[currentSortField];
      let bVal = b[currentSortField];
      
      // Handle special fields
      if (currentSortField === "value" || currentSortField === "paidAmount") {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
      } else {
        aVal = String(aVal || "").toLowerCase();
        bVal = String(bVal || "").toLowerCase();
      }

      if (aVal < bVal) return currentSortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return currentSortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // 3. Render
    contractsTableBody.innerHTML = "";
    
    if (contracts.length === 0) {
      contractsEmptyState.style.display = "flex";
      return;
    }
    
    contractsEmptyState.style.display = "none";

    contracts.forEach(c => {
      const debt = c.value - c.paidAmount;
      const totalCost = (c.costs.materials || 0) + (c.costs.labor || 0) + (c.costs.subcontract || 0) + (c.costs.shipping || 0) + (c.costs.miscellaneous || 0);
      const profit = c.value - totalCost;
      
      let statusBadge = "";
      if (c.status === "completed") {
        statusBadge = `<span class="badge badge-completed">Hoàn thành</span>`;
      } else if (c.status === "ongoing") {
        statusBadge = `<span class="badge badge-ongoing">Đang thực hiện</span>`;
      } else if (c.status === "debt") {
        statusBadge = `<span class="badge badge-debt">Còn nợ</span>`;
      } else if (c.status === "overdue") {
        statusBadge = `<span class="badge badge-overdue">Quá hạn</span>`;
      }

      const isUnprofitable = profit < 0;
      const profitStyle = isUnprofitable ? "color: var(--color-danger); font-weight: 500;" : "color: var(--color-success); font-weight: 500;";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${c.code}</strong></td>
        <td style="white-space: normal; min-width: 180px;" title="${c.customerName}">${c.customerName}</td>
        <td>${formatDateVN(c.signedDate)}</td>
        <td style="font-weight: 500;">${formatVND(c.value)}</td>
        <td>${formatVND(c.paidAmount)}</td>
        <td style="color: ${debt > 0 ? '#b86200' : 'inherit'}; font-weight: ${debt > 0 ? '600' : 'normal'};">${formatVND(debt)}</td>
        <td>${formatVND(totalCost)}</td>
        <td style="${profitStyle}">${formatVND(profit)}</td>
        <td>${formatDateVN(c.dueDate)}</td>
        <td>${statusBadge}</td>
        <td style="text-align: center;">
          <button class="btn btn-secondary btn-icon-only edit-contract-btn" data-id="${c.id}" title="Sửa hợp đồng">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger btn-icon-only delete-contract-btn" data-id="${c.id}" title="Xóa hợp đồng">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      `;

      // Wire buttons
      tr.querySelector(".edit-contract-btn").addEventListener("click", () => openContractModal(c.id));
      tr.querySelector(".delete-contract-btn").addEventListener("click", () => deleteContract(c.id));

      contractsTableBody.appendChild(tr);
    });
  }

  // Handle Sort Headers Click
  contractsHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const field = header.getAttribute("data-sort");
      
      // Update arrows UI
      contractsHeaders.forEach(h => {
        if (h !== header) h.className = "sortable";
      });

      if (currentSortField === field) {
        currentSortDirection = currentSortDirection === "asc" ? "desc" : "asc";
      } else {
        currentSortField = field;
        currentSortDirection = "asc";
      }

      header.className = `sortable sort-${currentSortDirection}`;
      renderContractsTable();
    });
  });

  // Filter Triggering
  filterSearch.addEventListener("input", renderContractsTable);
  filterStatus.addEventListener("change", renderContractsTable);
  filterStartDate.addEventListener("change", renderContractsTable);
  filterEndDate.addEventListener("change", renderContractsTable);

  btnResetFilters.addEventListener("click", () => {
    filterSearch.value = "";
    filterStatus.value = "all";
    filterStartDate.value = "";
    filterEndDate.value = "";
    renderContractsTable();
  });

  // --- CRUD FUNCTIONS ---
  function openContractModal(id = null) {
    contractForm.reset();
    
    // Set default dates to today
    const today = new Date().toISOString().split("T")[0];
    formSignedDate.value = today;

    if (id) {
      modalContractTitle.textContent = "Chỉnh sửa Hợp đồng";
      const c = window.store.getById(id);
      if (c) {
        contractIdHidden.value = c.id;
        formCode.value = c.code;
        formCustomerName.value = c.customerName;
        formCustomerAddress.value = c.customerAddress || "";
        formCustomerTaxCode.value = c.customerTaxCode || "";
        formRepresentative.value = c.representative || "";
        formPosition.value = c.position || "Giám đốc";
        formSignedDate.value = c.signedDate || "";
        formDeliveryDate.value = c.deliveryDate || "";
        formDueDate.value = c.dueDate || "";
        formValue.value = c.value;
        formPaidAmount.value = c.paidAmount;
        
        // If status is custom set or auto, match appropriately
        formStatus.value = c.status;
      }
    } else {
      modalContractTitle.textContent = "Thêm Hợp đồng mới";
      contractIdHidden.value = "";
      formStatus.value = "auto";
    }
    
    contractModal.classList.add("active");
  }

  function closeContractModal() {
    contractModal.classList.remove("active");
  }

  btnOpenAddModal.addEventListener("click", () => openContractModal(null));
  btnCloseContractModal.addEventListener("click", closeContractModal);
  btnCancelContractModal.addEventListener("click", closeContractModal);

  contractForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const id = contractIdHidden.value;
    const valueNum = Number(formValue.value);
    const paidNum = Number(formPaidAmount.value);
    
    // Validate
    if (paidNum > valueNum) {
      alert("Số tiền đã thanh toán không được lớn hơn tổng giá trị hợp đồng!");
      return;
    }

    const payload = {
      code: formCode.value.trim(),
      customerName: formCustomerName.value.trim(),
      customerAddress: formCustomerAddress.value.trim(),
      customerTaxCode: formCustomerTaxCode.value.trim(),
      representative: formRepresentative.value.trim(),
      position: formPosition.value.trim(),
      signedDate: formSignedDate.value,
      deliveryDate: formDeliveryDate.value,
      dueDate: formDueDate.value,
      value: valueNum,
      paidAmount: paidNum,
      notes: formNotes.value.trim()
    };

    // If explicit status selected instead of auto
    if (formStatus.value !== "auto") {
      payload.status = formStatus.value;
    }

    if (id) {
      // Edit
      window.store.update(id, payload);
    } else {
      // Add new
      window.store.add(payload);
    }

    closeContractModal();
    renderContractsTable();
    updateDashboard();
  });

  function deleteContract(id) {
    const c = window.store.getById(id);
    if (!c) return;
    
    if (confirm(`Bạn có chắc chắn muốn xóa Hợp đồng ${c.code} của khách hàng "${c.customerName}"?`)) {
      window.store.delete(id);
      renderContractsTable();
      updateDashboard();
    }
  }

  // --- TAB 3: COST TRACKING LOGIC ---
  function updateCostView() {
    renderCostContractSelectorList();
    
    // Select the first contract by default if none selected or if active one deleted
    const contracts = window.store.getAll();
    if (contracts.length > 0) {
      if (!activeCostContractId || !window.store.getById(activeCostContractId)) {
        selectContractForCost(contracts[0].id);
      } else {
        selectContractForCost(activeCostContractId);
      }
    } else {
      clearCostForm();
    }
  }

  function renderCostContractSelectorList() {
    const keyword = costSearchInput.value.trim().toLowerCase();
    let contracts = window.store.getAll();

    if (keyword) {
      contracts = contracts.filter(c => 
        c.code.toLowerCase().includes(keyword) ||
        c.customerName.toLowerCase().includes(keyword)
      );
    }

    costContractList.innerHTML = "";
    
    if (contracts.length === 0) {
      costContractList.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 20px;">Không tìm thấy hợp đồng</p>`;
      return;
    }

    contracts.forEach(c => {
      const div = document.createElement("div");
      div.className = `selector-item ${c.id === activeCostContractId ? "selected" : ""}`;
      div.setAttribute("data-id", c.id);
      
      const totalCost = (c.costs.materials || 0) + (c.costs.labor || 0) + (c.costs.subcontract || 0) + (c.costs.shipping || 0) + (c.costs.miscellaneous || 0);
      
      div.innerHTML = `
        <div class="selector-info">
          <h4>${c.code}</h4>
          <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">${c.customerName}</p>
          <p style="font-size: 0.75rem; color: var(--text-muted);">Giá thành: ${formatVND(totalCost)}</p>
        </div>
        <div class="selector-value">${formatVND(c.value)}</div>
      `;

      div.addEventListener("click", () => {
        selectContractForCost(c.id);
        // Highlight active list item
        document.querySelectorAll(".selector-item").forEach(item => item.classList.remove("selected"));
        div.classList.add("selected");
      });

      costContractList.appendChild(div);
    });
  }

  costSearchInput.addEventListener("input", renderCostContractSelectorList);

  function selectContractForCost(id) {
    activeCostContractId = id;
    const c = window.store.getById(id);
    if (!c) {
      clearCostForm();
      return;
    }

    costContractIdHidden.value = c.id;
    costFormTitle.textContent = `Giá thành Hợp đồng ${c.code}`;
    costContractCodeBadge.textContent = c.code;
    
    // Set status badge look based on status
    costContractCodeBadge.className = "badge";
    if (c.status === "completed") costContractCodeBadge.classList.add("badge-completed");
    else if (c.status === "ongoing") costContractCodeBadge.classList.add("badge-ongoing");
    else if (c.status === "debt") costContractCodeBadge.classList.add("badge-debt");
    else if (c.status === "overdue") costContractCodeBadge.classList.add("badge-overdue");

    // Populate inputs
    costValMaterials.value = c.costs.materials || 0;
    costValLabor.value = c.costs.labor || 0;
    costValSubcontract.value = c.costs.subcontract || 0;
    costValShipping.value = c.costs.shipping || 0;
    costValMiscellaneous.value = c.costs.miscellaneous || 0;

    calculateLiveCostTotals(c.value);
  }

  function calculateLiveCostTotals(contractValue) {
    const materials = Number(costValMaterials.value) || 0;
    const labor = Number(costValLabor.value) || 0;
    const subcontract = Number(costValSubcontract.value) || 0;
    const shipping = Number(costValShipping.value) || 0;
    const miscellaneous = Number(costValMiscellaneous.value) || 0;

    const totalCost = materials + labor + subcontract + shipping + miscellaneous;
    const profit = contractValue - totalCost;
    
    costTotalCalculated.textContent = formatVND(totalCost);
    costProfitCalculated.textContent = formatVND(profit);

    // Update style based on profitability
    costTotalSummaryBox.className = "cost-total-display";
    if (profit >= 0) {
      costTotalSummaryBox.classList.add("profitable");
      costProfitCalculated.style.color = "var(--color-success)";
    } else {
      costTotalSummaryBox.classList.add("unprofitable");
      costProfitCalculated.style.color = "var(--color-danger)";
    }

    // Update progress bar
    const ratio = contractValue > 0 ? (totalCost / contractValue) * 100 : 0;
    costRatioText.textContent = `${ratio.toFixed(1)}%`;
    costProgressBar.style.width = `${Math.min(ratio, 100)}%`;
    
    // Change progress bar gradient coloring based on ratio
    if (ratio > 90) {
      costProgressBar.style.background = "var(--color-danger)";
    } else if (ratio > 70) {
      costProgressBar.style.background = "var(--color-warning)";
    } else {
      costProgressBar.style.background = "var(--color-success)";
    }
  }

  // Live input recalculations
  document.querySelectorAll(".cost-numeric-input").forEach(input => {
    input.addEventListener("input", () => {
      const c = window.store.getById(activeCostContractId);
      if (c) calculateLiveCostTotals(c.value);
    });
  });

  btnResetCostInputs.addEventListener("click", () => {
    costValMaterials.value = 0;
    costValLabor.value = 0;
    costValSubcontract.value = 0;
    costValShipping.value = 0;
    costValMiscellaneous.value = 0;
    
    const c = window.store.getById(activeCostContractId);
    if (c) calculateLiveCostTotals(c.value);
  });

  costInputsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = costContractIdHidden.value;
    if (!id) return;

    const costsPayload = {
      costs: {
        materials: Number(costValMaterials.value) || 0,
        labor: Number(costValLabor.value) || 0,
        subcontract: Number(costValSubcontract.value) || 0,
        shipping: Number(costValShipping.value) || 0,
        miscellaneous: Number(costValMiscellaneous.value) || 0
      }
    };

    window.store.update(id, costsPayload);
    alert("Cập nhật chi phí giá thành thành công!");
    
    // Update local selector view & dashboards
    renderCostContractSelectorList();
    updateDashboard();
  });

  function clearCostForm() {
    costFormTitle.textContent = "Chưa có hợp đồng nào";
    costContractCodeBadge.textContent = "HD-NONE";
    costValMaterials.value = 0;
    costValLabor.value = 0;
    costValSubcontract.value = 0;
    costValShipping.value = 0;
    costValMiscellaneous.value = 0;
    costTotalCalculated.textContent = "0đ";
    costProfitCalculated.textContent = "0đ";
    costRatioText.textContent = "0%";
    costProgressBar.style.width = "0%";
  }


  // --- TAB 4: CONTRACT DOCUMENT AUTOMATION ---
  function updateDocumentViewSelectors() {
    const contracts = window.store.getAll();
    
    // Fill contracts select
    docSelectContract.innerHTML = "";
    if (contracts.length === 0) {
      docSelectContract.innerHTML = `<option value="">-- Chưa có hợp đồng nào --</option>`;
    } else {
      contracts.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = `${c.code} - ${c.customerName}`;
        docSelectContract.appendChild(option);
      });
    }

    // Fill templates select
    docSelectTemplate.innerHTML = "";
    CONTRACT_TEMPLATES.forEach(t => {
      const option = document.createElement("option");
      option.value = t.id;
      option.textContent = t.name;
      docSelectTemplate.appendChild(option);
    });

    // Populate additional fields based on selected contract
    handleDocContractChange();
  }

  function handleDocContractChange() {
    const selectedId = docSelectContract.value;
    if (!selectedId) {
      docValAddress.value = "";
      docValTax.value = "";
      docValRepresentative.value = "";
      docValPosition.value = "Giám đốc";
      return;
    }

    const c = window.store.getById(selectedId);
    if (c) {
      docValAddress.value = c.customerAddress || "";
      docValTax.value = c.customerTaxCode || "";
      docValRepresentative.value = c.representative || "";
      docValPosition.value = c.position || "Giám đốc";
    }
  }

  docSelectContract.addEventListener("change", handleDocContractChange);

  // Autofill Template Engine
  btnGenerateDocument.addEventListener("click", () => {
    const contractId = docSelectContract.value;
    const templateId = docSelectTemplate.value;

    if (!contractId) {
      alert("Vui lòng thêm và chọn hợp đồng trước khi trích xuất biểu mẫu!");
      return;
    }

    const c = window.store.getById(contractId);
    const template = CONTRACT_TEMPLATES.find(t => t.id === templateId);

    if (!c || !template) return;

    // Compile dynamic data tokens
    const debt = c.value - c.paidAmount;
    
    // Dates splits
    const signed = c.signedDate ? c.signedDate.split("-") : ["--", "--", "----"];
    const delivery = c.deliveryDate ? c.deliveryDate.split("-") : ["--", "--", "----"];
    const due = c.dueDate ? c.dueDate.split("-") : ["--", "--", "----"];
    
    const today = new Date();
    const todayDay = String(today.getDate()).padStart(2, '0');
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayYear = today.getFullYear();

    // Map token parameters
    const tokens = {
      "{{MA_HD}}": c.code || "HD-XXXX",
      "{{TEN_KH}}": c.customerName || "................................................................",
      "{{DIA_CHI_KH}}": docValAddress.value.trim() || c.customerAddress || "................................................................",
      "{{MST_KH}}": docValTax.value.trim() || c.customerTaxCode || "................................",
      "{{NGUOI_DAI_DIEN}}": docValRepresentative.value.trim() || c.representative || "................................",
      "{{CHUC_VU}}": docValPosition.value.trim() || c.position || "Giám đốc",
      
      "{{GIA_TRI}}": c.value.toLocaleString("vi-VN"),
      "{{GIA_TRI_TEXT}}": window.readVietnameseNumber(c.value),
      "{{DA_THANH_TOAN}}": c.paidAmount.toLocaleString("vi-VN"),
      "{{DA_THANH_TOAN_TEXT}}": window.readVietnameseNumber(c.paidAmount),
      "{{CONG_NO}}": debt.toLocaleString("vi-VN"),
      "{{CONG_NO_TEXT}}": window.readVietnameseNumber(debt),
      "{{GHI_CHU}}": c.notes || "Thực hiện cung ứng theo thỏa thuận kỹ thuật",

      "{{NGAY_KY_FULL}}": formatDateVN(c.signedDate),
      "{{NGAY_KY_NGAY}}": signed[2] || "--",
      "{{NGAY_KY_THANG}}": signed[1] || "--",
      "{{NGAY_KY_NAM}}": signed[0] || "----",

      "{{NGAY_GH_FULL}}": formatDateVN(c.deliveryDate),
      "{{HAN_TT_FULL}}": formatDateVN(c.dueDate),

      "{{CURRENT_DATE_FULL}}": `${todayDay}/${todayMonth}/${todayYear}`,
      "{{CURRENT_DATE_NGAY}}": todayDay,
      "{{CURRENT_DATE_THANG}}": todayMonth,
      "{{CURRENT_DATE_NAM}}": todayYear
    };

    // Replace tokens inside template layout
    let compiledHTML = template.content;
    for (const [token, value] of Object.entries(tokens)) {
      // Use split/join to replace all occurrences of token
      compiledHTML = compiledHTML.split(token).join(value);
    }

    // Set preview output with contenteditable enabling quick human edits
    a4PaperContainer.innerHTML = compiledHTML;
    a4PaperContainer.setAttribute("contenteditable", "true");
    a4PaperContainer.title = "Ấn trực tiếp vào chữ để sửa đổi nhanh bản in";
    
    // Auto-scroll to preview
    a4PaperContainer.scrollIntoView({ behavior: "smooth" });
  });

  // Printing & exporting to PDF via native browser layout styling
  btnPrintDocument.addEventListener("click", () => {
    // Check if document loaded
    if (a4PaperContainer.querySelector(".empty-state")) {
      alert("Vui lòng chọn biểu mẫu và ấn 'Áp dụng dữ liệu & Điền mẫu' trước!");
      return;
    }
    
    window.print();
  });


  // --- CSV / JSON EXPORT & IMPORT EVENTS ---
  // Export CSV
  btnExportCSV.addEventListener("click", () => {
    const csvString = window.store.exportToCSV();
    
    // Download trigger
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Bao_cao_hop_dong_cong_no_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Modal Import events
  btnOpenImportModal.addEventListener("click", () => {
    importStatusMessage.style.display = "none";
    importModal.classList.add("active");
  });

  function closeImportModal() {
    importModal.classList.remove("active");
  }

  btnCloseImportModal.addEventListener("click", closeImportModal);
  btnCancelImportModal.addEventListener("click", closeImportModal);

  // File Picker
  fileDropZone.addEventListener("click", () => {
    filePickerInput.click();
  });

  filePickerInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleFileImport(file);
  });

  // Drag and Drop
  fileDropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileDropZone.style.borderColor = "var(--primary-accent)";
    fileDropZone.style.backgroundColor = "var(--primary-accent-light)";
  });

  fileDropZone.addEventListener("dragleave", () => {
    fileDropZone.style.borderColor = "var(--border-color)";
    fileDropZone.style.backgroundColor = "transparent";
  });

  fileDropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    fileDropZone.style.borderColor = "var(--border-color)";
    fileDropZone.style.backgroundColor = "transparent";
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileImport(file);
  });

  function handleFileImport(file) {
    const reader = new FileReader();
    const isJSON = file.name.endsWith(".json");
    const isCSV = file.name.endsWith(".csv");

    if (!isJSON && !isCSV) {
      showImportFeedback(false, "Định dạng tệp không được hỗ trợ! Vui lòng chọn tệp .json hoặc .csv");
      return;
    }

    reader.onload = (event) => {
      const content = event.target.result;
      let result = { success: false, error: "Định dạng tệp không đọc được." };

      if (isJSON) {
        result = window.store.importFromJSON(content);
      } else if (isCSV) {
        result = window.store.importFromCSV(content);
      }

      if (result.success) {
        showImportFeedback(true, `Nhập dữ liệu thành công! Đã thêm/cập nhật ${result.count} hợp đồng vào danh sách.`);
        // Refresh all views
        renderContractsTable();
        updateDashboard();
        updateCostView();
        updateDocumentViewSelectors();
      } else {
        showImportFeedback(false, result.error);
      }
    };

    reader.readAsText(file);
  }

  function showImportFeedback(success, message) {
    importStatusMessage.textContent = message;
    importStatusMessage.style.display = "block";
    
    if (success) {
      importStatusMessage.style.backgroundColor = "var(--color-success-bg)";
      importStatusMessage.style.color = "var(--color-success)";
      importStatusMessage.style.border = "1px solid rgba(16, 185, 129, 0.3)";
    } else {
      importStatusMessage.style.backgroundColor = "var(--color-danger-bg)";
      importStatusMessage.style.color = "var(--color-danger)";
      importStatusMessage.style.border = "1px solid rgba(239, 68, 68, 0.3)";
    }
  }

  // --- INITIALIZE APPLICATION STATE ---
  initTabs();
  updateDashboard();
});
