/**
 * Data Management Module for Contract & Debt Tracker
 * Stores data in localStorage, handles import/export (JSON, CSV).
 */

const STORAGE_KEY = "TTTT_CONTRACTS_DATA";

// Fallback sample data in case localStorage is empty
const DEFAULT_CONTRACTS = [
  {
    id: "ct_001",
    code: "HD-2026-001",
    customerName: "Công ty Cổ phần Đầu tư và Phát triển Minh Long",
    customerAddress: "Lô C2 Khu Công nghiệp Quất Động, Thường Tín, Hà Nội",
    customerTaxCode: "0108923456",
    representative: "Trần Minh Long",
    position: "Tổng Giám đốc",
    signedDate: "2026-01-15",
    deliveryDate: "2026-04-15",
    dueDate: "2026-05-15",
    value: 850000000,
    paidAmount: 600000000,
    status: "debt", // Completed/Ongoing/Debt/Overdue
    notes: "Triển khai phần mềm quản lý kho ERP và bảo trì 1 năm.",
    costs: {
      materials: 120000000,
      labor: 280000000,
      subcontract: 50000000,
      shipping: 10000000,
      miscellaneous: 20000000
    }
  },
  {
    id: "ct_002",
    code: "HD-2026-002",
    customerName: "Công ty TNHH Thương mại & Dịch vụ Hoàng Phát",
    customerAddress: "Số 45 Lê Văn Lương, Quận Thanh Xuân, Hà Nội",
    customerTaxCode: "0109543210",
    representative: "Lê Hoàng Phát",
    position: "Giám đốc",
    signedDate: "2026-02-10",
    deliveryDate: "2026-05-10",
    dueDate: "2026-06-10",
    value: 420000000,
    paidAmount: 420000000,
    status: "completed",
    notes: "Cung cấp và lắp đặt thiết bị phòng họp thông minh.",
    costs: {
      materials: 250000000,
      labor: 40000000,
      subcontract: 0,
      shipping: 15000000,
      miscellaneous: 5000000
    }
  },
  {
    id: "ct_003",
    code: "HD-2026-003",
    customerName: "Công ty Cổ phần Thiết bị Giáo dục Thành An",
    customerAddress: "Khu đô thị mới Dương Nội, Hà Đông, Hà Nội",
    customerTaxCode: "0107345678",
    representative: "Nguyễn Thành An",
    position: "Chức vụ: Giám đốc",
    signedDate: "2026-03-01",
    deliveryDate: "2026-06-30",
    dueDate: "2026-07-30",
    value: 1250000000,
    paidAmount: 500000000,
    status: "ongoing",
    notes: "Thi công hệ thống điện nhẹ và mạng Lan cho tòa nhà trường học.",
    costs: {
      materials: 600000000,
      labor: 300000000,
      subcontract: 100000000,
      shipping: 20000000,
      miscellaneous: 30000000
    }
  },
  {
    id: "ct_004",
    code: "HD-2026-004",
    customerName: "Doanh nghiệp Tư nhân Xây dựng An Bình",
    customerAddress: "Số 88 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội",
    customerTaxCode: "0106456789",
    representative: "Phạm An Bình",
    position: "Chủ doanh nghiệp",
    signedDate: "2026-01-05",
    deliveryDate: "2026-03-05",
    dueDate: "2026-04-05",
    value: 300000000,
    paidAmount: 100000000,
    status: "overdue",
    notes: "Tư vấn thiết kế kiến trúc và cảnh quan khu biệt thự liền kề.",
    costs: {
      materials: 10000000,
      labor: 120000000,
      subcontract: 40000000,
      shipping: 5000000,
      miscellaneous: 15000000
    }
  },
  {
    id: "ct_005",
    code: "HD-2026-005",
    customerName: "Công ty TNHH MTV Xuất Nhập Khẩu Đại Dương",
    customerAddress: "Cảng Đình Vũ, Hải An, Hải Phòng",
    customerTaxCode: "0201876543",
    representative: "Vũ Đại Dương",
    position: "Giám đốc điều hành",
    signedDate: "2026-04-20",
    deliveryDate: "2026-08-20",
    dueDate: "2026-09-20",
    value: 950000000,
    paidAmount: 300000000,
    status: "ongoing",
    notes: "Bảo trì nâng cấp hệ thống máy chủ và dịch vụ đám mây.",
    costs: {
      materials: 400000000,
      labor: 150000000,
      subcontract: 80000000,
      shipping: 5000000,
      miscellaneous: 10000000
    }
  }
];

class DataStore {
  constructor() {
    this.contracts = [];
    this.loadData();
  }

  // Load contracts from localStorage or fallback to defaults
  loadData() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (serialized) {
        this.contracts = JSON.parse(serialized);
      } else {
        this.contracts = [...DEFAULT_CONTRACTS];
        this.saveData();
      }
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
      this.contracts = [...DEFAULT_CONTRACTS];
    }
  }

  // Save current contracts state to localStorage
  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.contracts));
      return true;
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
      return false;
    }
  }

  // Get all contracts
  getAll() {
    return this.contracts;
  }

  // Get single contract by id
  getById(id) {
    return this.contracts.find(c => c.id === id) || null;
  }

  // Add a new contract
  add(contract) {
    const newContract = {
      id: "ct_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      code: contract.code || "",
      customerName: contract.customerName || "",
      customerAddress: contract.customerAddress || "",
      customerTaxCode: contract.customerTaxCode || "",
      representative: contract.representative || "",
      position: contract.position || "Giám đốc",
      signedDate: contract.signedDate || new Date().toISOString().split('T')[0],
      deliveryDate: contract.deliveryDate || "",
      dueDate: contract.dueDate || "",
      value: Number(contract.value) || 0,
      paidAmount: Number(contract.paidAmount) || 0,
      status: contract.status || "ongoing",
      notes: contract.notes || "",
      costs: {
        materials: Number(contract.costs?.materials) || 0,
        labor: Number(contract.costs?.labor) || 0,
        subcontract: Number(contract.costs?.subcontract) || 0,
        shipping: Number(contract.costs?.shipping) || 0,
        miscellaneous: Number(contract.costs?.miscellaneous) || 0
      }
    };
    
    // Automatically update status based on payment and dates if needed
    this.updateStatusAutomatically(newContract);

    this.contracts.unshift(newContract); // Add to beginning of array
    this.saveData();
    return newContract;
  }

  // Update an existing contract
  update(id, updatedFields) {
    const index = this.contracts.findIndex(c => c.id === id);
    if (index === -1) return null;

    const current = this.contracts[index];
    
    // Merge core fields
    const updatedContract = {
      ...current,
      code: updatedFields.code !== undefined ? updatedFields.code : current.code,
      customerName: updatedFields.customerName !== undefined ? updatedFields.customerName : current.customerName,
      customerAddress: updatedFields.customerAddress !== undefined ? updatedFields.customerAddress : current.customerAddress,
      customerTaxCode: updatedFields.customerTaxCode !== undefined ? updatedFields.customerTaxCode : current.customerTaxCode,
      representative: updatedFields.representative !== undefined ? updatedFields.representative : current.representative,
      position: updatedFields.position !== undefined ? updatedFields.position : current.position,
      signedDate: updatedFields.signedDate !== undefined ? updatedFields.signedDate : current.signedDate,
      deliveryDate: updatedFields.deliveryDate !== undefined ? updatedFields.deliveryDate : current.deliveryDate,
      dueDate: updatedFields.dueDate !== undefined ? updatedFields.dueDate : current.dueDate,
      value: updatedFields.value !== undefined ? Number(updatedFields.value) : current.value,
      paidAmount: updatedFields.paidAmount !== undefined ? Number(updatedFields.paidAmount) : current.paidAmount,
      status: updatedFields.status !== undefined ? updatedFields.status : current.status,
      notes: updatedFields.notes !== undefined ? updatedFields.notes : current.notes,
    };

    // Merge nested costs
    if (updatedFields.costs) {
      updatedContract.costs = {
        materials: updatedFields.costs.materials !== undefined ? Number(updatedFields.costs.materials) : current.costs.materials,
        labor: updatedFields.costs.labor !== undefined ? Number(updatedFields.costs.labor) : current.costs.labor,
        subcontract: updatedFields.costs.subcontract !== undefined ? Number(updatedFields.costs.subcontract) : current.costs.subcontract,
        shipping: updatedFields.costs.shipping !== undefined ? Number(updatedFields.costs.shipping) : current.costs.shipping,
        miscellaneous: updatedFields.costs.miscellaneous !== undefined ? Number(updatedFields.costs.miscellaneous) : current.costs.miscellaneous
      };
    }

    // Automatically update status based on changes
    this.updateStatusAutomatically(updatedContract);

    this.contracts[index] = updatedContract;
    this.saveData();
    return updatedContract;
  }

  // Delete a contract
  delete(id) {
    const initialLength = this.contracts.length;
    this.contracts = this.contracts.filter(c => c.id !== id);
    if (this.contracts.length !== initialLength) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Helper to determine status based on payments and deadlines
  updateStatusAutomatically(contract) {
    const debt = contract.value - contract.paidAmount;
    
    // If user manually set status, we can honor it unless it conflicts heavily
    // Or we compute it:
    if (debt <= 0) {
      contract.status = "completed";
    } else {
      // It has debt. Check if it's overdue
      if (contract.dueDate) {
        const todayStr = new Date().toISOString().split('T')[0];
        if (todayStr > contract.dueDate) {
          contract.status = "overdue";
        } else {
          contract.status = "debt";
        }
      } else {
        contract.status = "ongoing";
      }
    }
  }

  // Calculate stats
  getStats() {
    let totalContracts = this.contracts.length;
    let totalRevenue = 0;
    let totalPaid = 0;
    let totalDebt = 0;
    let totalCost = 0;
    let overdueDebt = 0;
    
    const todayStr = new Date().toISOString().split('T')[0];

    this.contracts.forEach(c => {
      totalRevenue += c.value;
      totalPaid += c.paidAmount;
      const debt = c.value - c.paidAmount;
      if (debt > 0) {
        totalDebt += debt;
        if (c.dueDate && todayStr > c.dueDate) {
          overdueDebt += debt;
        }
      }
      
      const itemCost = (c.costs.materials || 0) + 
                       (c.costs.labor || 0) + 
                       (c.costs.subcontract || 0) + 
                       (c.costs.shipping || 0) + 
                       (c.costs.miscellaneous || 0);
      totalCost += itemCost;
    });

    const netProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return {
      totalContracts,
      totalRevenue,
      totalPaid,
      totalDebt,
      overdueDebt,
      totalCost,
      netProfit,
      profitMargin
    };
  }

  // Calculate cost items totals
  getCostBreakdown() {
    let materials = 0;
    let labor = 0;
    let subcontract = 0;
    let shipping = 0;
    let miscellaneous = 0;

    this.contracts.forEach(c => {
      materials += c.costs.materials || 0;
      labor += c.costs.labor || 0;
      subcontract += c.costs.subcontract || 0;
      shipping += c.costs.shipping || 0;
      miscellaneous += c.costs.miscellaneous || 0;
    });

    return { materials, labor, subcontract, shipping, miscellaneous };
  }

  // Export database as JSON string
  exportToJSON() {
    return JSON.stringify(this.contracts, null, 2);
  }

  // Import database from JSON string
  importFromJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        // Validate keys in a simple way
        const isValid = parsed.every(item => item.code && item.customerName && typeof item.value === 'number');
        if (isValid) {
          // Add default structures if missing
          this.contracts = parsed.map(c => ({
            id: c.id || "ct_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
            code: c.code || "",
            customerName: c.customerName || "",
            customerAddress: c.customerAddress || "",
            customerTaxCode: c.customerTaxCode || "",
            representative: c.representative || "",
            position: c.position || "Giám đốc",
            signedDate: c.signedDate || "",
            deliveryDate: c.deliveryDate || "",
            dueDate: c.dueDate || "",
            value: Number(c.value) || 0,
            paidAmount: Number(c.paidAmount) || 0,
            status: c.status || "ongoing",
            notes: c.notes || "",
            costs: {
              materials: Number(c.costs?.materials) || 0,
              labor: Number(c.costs?.labor) || 0,
              subcontract: Number(c.costs?.subcontract) || 0,
              shipping: Number(c.costs?.shipping) || 0,
              miscellaneous: Number(c.costs?.miscellaneous) || 0
            }
          }));
          this.saveData();
          return { success: true, count: this.contracts.length };
        }
      }
      return { success: false, error: "Định dạng dữ liệu JSON không đúng cấu trúc danh sách hợp đồng." };
    } catch (e) {
      return { success: false, error: "Tệp JSON không hợp lệ: " + e.message };
    }
  }

  // Export to CSV string
  exportToCSV() {
    // UTF-8 Byte Order Mark (BOM) to support Vietnamese in Excel
    let csvContent = "\uFEFF";
    
    // Header
    const headers = [
      "Mã hợp đồng", "Tên khách hàng", "Địa chỉ", "MST", "Người đại diện", "Chức vụ",
      "Ngày ký", "Ngày giao hàng", "Hạn thanh toán", "Giá trị HĐ (VND)", "Đã thanh toán (VND)",
      "Công nợ (VND)", "Vật tư (VND)", "Nhân công (VND)", "Thuê ngoài (VND)", "Vận chuyển (VND)", 
      "Chi phí khác (VND)", "Tổng giá thành (VND)", "Lợi nhuận (VND)", "Trạng thái", "Ghi chú"
    ];
    csvContent += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(",") + "\r\n";

    // Data rows
    this.contracts.forEach(c => {
      const debt = c.value - c.paidAmount;
      const totalCost = (c.costs.materials || 0) + (c.costs.labor || 0) + (c.costs.subcontract || 0) + (c.costs.shipping || 0) + (c.costs.miscellaneous || 0);
      const profit = c.value - totalCost;
      
      let statusText = "Đang thực hiện";
      if (c.status === "completed") statusText = "Hoàn thành";
      else if (c.status === "debt") statusText = "Còn nợ";
      else if (c.status === "overdue") statusText = "Quá hạn";

      const row = [
        c.code,
        c.customerName,
        c.customerAddress,
        c.customerTaxCode,
        c.representative,
        c.position,
        c.signedDate,
        c.deliveryDate,
        c.dueDate,
        c.value,
        c.paidAmount,
        debt,
        c.costs.materials,
        c.costs.labor,
        c.costs.subcontract,
        c.costs.shipping,
        c.costs.miscellaneous,
        totalCost,
        profit,
        statusText,
        c.notes
      ];

      csvContent += row.map(val => {
        if (val === undefined || val === null) return '""';
        const strVal = String(val);
        return `"${strVal.replace(/"/g, '""')}"`;
      }).join(",") + "\r\n";
    });

    return csvContent;
  }

  // Import from CSV string
  importFromCSV(csvString) {
    try {
      const lines = csvString.split(/\r?\n/);
      if (lines.length <= 1) return { success: false, error: "Tệp CSV rỗng hoặc chỉ có dòng tiêu đề." };

      // Parse helper (handles commas inside quotes)
      const parseCSVLine = (text) => {
        let p = '', r = [];
        let q = false;
        for (let i = 0; i < text.length; i++) {
          let c = text[i];
          if (c === '"') {
            if (q && text[i+1] === '"') { p += '"'; i++; } // escaped quotes
            else { q = !q; } // toggle quote state
          } else if (c === ',' && !q) {
            r.push(p); p = '';
          } else {
            p += c;
          }
        }
        r.push(p);
        return r;
      };

      const headerLine = lines[0].replace(/^\uFEFF/, ""); // Remove BOM if present
      const headers = parseCSVLine(headerLine).map(h => h.trim().toLowerCase());
      
      // Let's identify the positions of critical headers
      const getIndex = (possibleNames) => {
        return headers.findIndex(h => possibleNames.some(name => h.includes(name.toLowerCase())));
      };

      const idxCode = getIndex(["mã hợp đồng", "ma hop dong", "code", "mã hđ"]);
      const idxName = getIndex(["tên khách hàng", "ten khach hang", "customerName", "khách hàng"]);
      const idxValue = getIndex(["giá trị hợp đồng", "giá trị hđ", "gia tri", "value"]);
      
      if (idxCode === -1 || idxName === -1 || idxValue === -1) {
        return { 
          success: false, 
          error: "Không tìm thấy các cột bắt buộc: 'Mã hợp đồng', 'Tên khách hàng', 'Giá trị HĐ' trong tệp CSV." 
        };
      }

      const idxAddress = getIndex(["địa chỉ", "dia chi", "address"]);
      const idxTax = getIndex(["mst", "mã số thuế", "tax"]);
      const idxRep = getIndex(["người đại diện", "dai dien", "representative"]);
      const idxPos = getIndex(["chức vụ", "chuc vu", "position"]);
      const idxSigned = getIndex(["ngày ký", "ngay ky", "signed"]);
      const idxDeliv = getIndex(["ngày giao hàng", "ngay giao", "delivery"]);
      const idxDue = getIndex(["hạn thanh toán", "han thanh toan", "due"]);
      const idxPaid = getIndex(["đã thanh toán", "da thanh toan", "paid"]);
      
      const idxMat = getIndex(["vật tư", "vat tu", "materials"]);
      const idxLab = getIndex(["nhân công", "nhan cong", "labor"]);
      const idxSub = getIndex(["thuê ngoài", "thue ngoai", "subcontract"]);
      const idxShip = getIndex(["vận chuyển", "van chuyen", "shipping"]);
      const idxMisc = getIndex(["chi phí khác", "chi phi khac", "miscellaneous", "khác"]);
      const idxNotes = getIndex(["ghi chú", "ghi chu", "notes"]);

      let newContracts = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const cols = parseCSVLine(lines[i]);
        if (cols.length < 3) continue;

        const val = Number(cols[idxValue]?.replace(/[^0-9.-]/g, "")) || 0;
        const paid = idxPaid !== -1 ? (Number(cols[idxPaid]?.replace(/[^0-9.-]/g, "")) || 0) : 0;
        
        const contract = {
          id: "ct_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5) + "_" + i,
          code: cols[idxCode]?.trim() || "HD-NEW-" + i,
          customerName: cols[idxName]?.trim() || "Khách hàng không rõ",
          customerAddress: idxAddress !== -1 ? cols[idxAddress]?.trim() : "",
          customerTaxCode: idxTax !== -1 ? cols[idxTax]?.trim() : "",
          representative: idxRep !== -1 ? cols[idxRep]?.trim() : "",
          position: idxPos !== -1 ? cols[idxPos]?.trim() : "Giám đốc",
          signedDate: idxSigned !== -1 ? cols[idxSigned]?.trim() : new Date().toISOString().split('T')[0],
          deliveryDate: idxDeliv !== -1 ? cols[idxDeliv]?.trim() : "",
          dueDate: idxDue !== -1 ? cols[idxDue]?.trim() : "",
          value: val,
          paidAmount: paid,
          notes: idxNotes !== -1 ? cols[idxNotes]?.trim() : "",
          costs: {
            materials: idxMat !== -1 ? (Number(cols[idxMat]?.replace(/[^0-9.-]/g, "")) || 0) : 0,
            labor: idxLab !== -1 ? (Number(cols[idxLab]?.replace(/[^0-9.-]/g, "")) || 0) : 0,
            subcontract: idxSub !== -1 ? (Number(cols[idxSub]?.replace(/[^0-9.-]/g, "")) || 0) : 0,
            shipping: idxShip !== -1 ? (Number(cols[idxShip]?.replace(/[^0-9.-]/g, "")) || 0) : 0,
            miscellaneous: idxMisc !== -1 ? (Number(cols[idxMisc]?.replace(/[^0-9.-]/g, "")) || 0) : 0
          }
        };

        this.updateStatusAutomatically(contract);
        newContracts.push(contract);
      }

      if (newContracts.length === 0) {
        return { success: false, error: "Không nhập được dòng dữ liệu nào từ tệp CSV." };
      }

      this.contracts = [...newContracts, ...this.contracts]; // Prepends imported data
      this.saveData();
      return { success: true, count: newContracts.length };

    } catch (e) {
      return { success: false, error: "Lỗi phân tích tệp CSV: " + e.message };
    }
  }
}

// Instantiate globally for easy consumption in index.html and app.js
const store = new DataStore();
window.store = store;
window.readVietnameseNumber = readVietnameseNumber;

