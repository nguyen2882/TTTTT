/**
 * Default contract and document templates with placeholders.
 * Placeholders are enclosed in double curly braces, e.g., {{MA_HD}}
 */
const CONTRACT_TEMPLATES = [
  {
    id: "service_agreement",
    name: "Hợp đồng Cung cấp Dịch vụ",
    description: "Mẫu hợp đồng áp dụng cho các hoạt động cung cấp dịch vụ, tư vấn, triển khai giải pháp.",
    content: `
<div class="contract-doc">
  <div class="contract-header">
    <div class="national-brand">
      <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
      <span class="underline-decoration">Độc lập - Tự do - Hạnh phúc</span>
    </div>
    <div class="doc-meta">
      <p><em>Hà Nội, Ngày {{NGAY_KY_NGAY}} tháng {{NGAY_KY_THANG}} năm {{NGAY_KY_NAM}}</em></p>
    </div>
  </div>

  <h2 class="contract-title">HỢP ĐỒNG CUNG CẤP DỊCH VỤ</h2>
  <p class="contract-subtitle">Số: {{MA_HD}}/HĐDV-{{NGAY_KY_NAM}}</p>

  <p><em>- Căn cứ Bộ luật Dân sự nước Cộng hòa xã hội chủ nghĩa Việt Nam số 91/2015/QH13 ngày 24/11/2015;</em></p>
  <p><em>- Căn cứ Luật Thương mại nước Cộng hòa xã hội chủ nghĩa Việt Nam số 36/2005/QH11 ngày 14/06/2005;</em></p>
  <p><em>- Căn cứ vào nhu cầu và khả năng thực tế của hai bên.</em></p>

  <p>Hôm nay, ngày {{NGAY_KY_FULL}}, tại văn phòng Công ty, chúng tôi gồm các bên:</p>

  <div class="party-info">
    <h4>BÊN A: BÊN SỬ DỤNG DỊCH VỤ (KHÁCH HÀNG)</h4>
    <p><strong>Tên đơn vị/Cá nhân:</strong> {{TEN_KH}}</p>
    <p><strong>Địa chỉ:</strong> {{DIA_CHI_KH}}</p>
    <p><strong>Mã số thuế:</strong> {{MST_KH}}</p>
    <p><strong>Đại diện pháp luật:</strong> {{NGUOI_DAI_DIEN}}</p>
    <p><strong>Chức vụ:</strong> {{CHUC_VU}}</p>
  </div>

  <div class="party-info">
    <h4>BÊN B: BÊN CUNG CẤP DỊCH VỤ</h4>
    <p><strong>Tên đơn vị:</strong> CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ & GIẢI PHÁP SỐ TTTT</p>
    <p><strong>Địa chỉ:</strong> Số 123 Đường Láng, Quận Đống Đa, TP. Hà Nội</p>
    <p><strong>Điện thoại:</strong> 024.3456.7890</p>
    <p><strong>Mã số thuế:</strong> 0102030405</p>
    <p><strong>Đại diện pháp luật:</strong> Nguyễn Văn A</p>
    <p><strong>Chức vụ:</strong> Giám đốc</p>
  </div>

  <p>Sau khi bàn bạc thảo luận, hai bên đồng ý ký kết Hợp đồng cung cấp dịch vụ này với các điều khoản cụ thể sau đây:</p>

  <h4>ĐIỀU 1: NỘI DUNG DỊCH VỤ VÀ THỜI GIAN THỰC HIỆN</h4>
  <p>1. Bên B thực hiện cung cấp dịch vụ theo yêu cầu của Bên A cụ thể: <strong>{{GHI_CHU}}</strong>.</p>
  <p>2. Thời gian bắt đầu thực hiện: Từ ngày {{NGAY_KY_FULL}}.</p>
  <p>3. Thời hạn hoàn thành bàn giao dự kiến: Ngày {{NGAY_GH_FULL}}.</p>

  <h4>ĐIỀU 2: GIÁ TRỊ HỢP ĐỒNG VÀ PHƯƠNG THỨC THANH TOÁN</h4>
  <p>1. Tổng giá trị Hợp đồng là: <strong>{{GIA_TRI}} VNĐ</strong> <em>(Bằng chữ: {{GIA_TRI_TEXT}} đồng)</em>.</p>
  <p>2. Phương thức thanh toán: Chuyển khoản qua tài khoản ngân hàng của Bên B.</p>
  <p>3. Tiến độ thanh toán:</p>
  <ul>
    <li>Đợt 1: Bên A tạm ứng/thanh toán cho Bên B số tiền <strong>{{DA_THANH_TOAN}} VNĐ</strong> sau khi ký hợp đồng.</li>
    <li>Đợt 2: Bên A thanh toán số tiền còn lại là <strong>{{CONG_NO}} VNĐ</strong> trong vòng 07 ngày kể từ ngày nghiệm thu, bàn giao dịch vụ và nhận đầy đủ chứng từ hóa đơn hợp lệ (Hạn thanh toán: {{HAN_TT_FULL}}).</li>
  </ul>

  <h4>ĐIỀU 3: QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN</h4>
  <p>1. Bên A có nghĩa vụ cung cấp đầy đủ thông tin, tài liệu cần thiết và phối hợp chặt chẽ với Bên B để thực hiện dịch vụ. Thanh toán đúng hạn theo Điều 2 của Hợp đồng.</p>
  <p>2. Bên B có nghĩa vụ cung cấp dịch vụ đúng chất lượng, tiến độ thỏa thuận. Bảo mật thông tin dữ liệu của Bên A.</p>

  <h4>ĐIỀU 4: ĐIỀU KHOẢN CHUNG</h4>
  <p>1. Hai bên cam kết thực hiện đúng các điều khoản đã thỏa thuận trong hợp đồng. Mọi thay đổi, bổ sung phải được lập thành văn bản (Phụ lục hợp đồng) có chữ ký của hai bên.</p>
  <p>2. Hợp đồng có hiệu lực kể từ ngày ký và được lập thành 02 (hai) bản có giá trị pháp lý như nhau, mỗi bên giữ 01 (một) bản.</p>

  <div class="signature-section">
    <div class="signature-box">
      <strong>ĐẠI DIỆN BÊN A</strong><br>
      <span>(Ký, đóng dấu và ghi rõ họ tên)</span>
      <div class="signature-space"></div>
      <strong>{{NGUOI_DAI_DIEN}}</strong>
    </div>
    <div class="signature-box">
      <strong>ĐẠI DIỆN BÊN B</strong><br>
      <span>(Ký, đóng dấu và ghi rõ họ tên)</span>
      <div class="signature-space"></div>
      <strong>Nguyễn Văn A</strong>
    </div>
  </div>
</div>
`
  },
  {
    id: "sales_contract",
    name: "Hợp đồng Mua bán Hàng hóa",
    description: "Mẫu hợp đồng áp dụng cho việc mua bán, cung ứng vật tư, sản phẩm thương mại.",
    content: `
<div class="contract-doc">
  <div class="contract-header">
    <div class="national-brand">
      <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
      <span class="underline-decoration">Độc lập - Tự do - Hạnh phúc</span>
    </div>
    <div class="doc-meta">
      <p><em>Hà Nội, Ngày {{NGAY_KY_NGAY}} tháng {{NGAY_KY_THANG}} năm {{NGAY_KY_NAM}}</em></p>
    </div>
  </div>

  <h2 class="contract-title">HỢP ĐỒNG MUA BÁN HÀNG HÓA</h2>
  <p class="contract-subtitle">Số: {{MA_HD}}/HĐMB-{{NGAY_KY_NAM}}</p>

  <p><em>- Căn cứ Luật Thương mại Việt Nam 2005;</em></p>
  <p><em>- Căn cứ nhu cầu mua bán hàng hóa giữa hai bên.</em></p>

  <p>Hôm nay, ngày {{NGAY_KY_FULL}}, hai bên gồm:</p>

  <div class="party-info">
    <h4>BÊN MUA (BÊN A):</h4>
    <p><strong>Tên đơn vị/Cá nhân:</strong> {{TEN_KH}}</p>
    <p><strong>Địa chỉ:</strong> {{DIA_CHI_KH}}</p>
    <p><strong>Mã số thuế:</strong> {{MST_KH}}</p>
    <p><strong>Đại diện:</strong> {{NGUOI_DAI_DIEN}}</p>
    <p><strong>Chức vụ:</strong> {{CHUC_VU}}</p>
  </div>

  <div class="party-info">
    <h4>BÊN BÁN (BÊN B):</h4>
    <p><strong>Tên đơn vị:</strong> CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ & GIẢI PHÁP SỐ TTTT</p>
    <p><strong>Địa chỉ:</strong> Số 123 Đường Láng, Quận Đống Đa, TP. Hà Nội</p>
    <p><strong>Đại diện:</strong> Nguyễn Văn A</p>
    <p><strong>Chức vụ:</strong> Giám đốc</p>
  </div>

  <p>Hai bên đồng ý thống nhất ký kết hợp đồng với các điều khoản như sau:</p>

  <h4>ĐIỀU 1: HÀNG HÓA VÀ GIÁ TRỊ HỢP ĐỒNG</h4>
  <p>1. Bên B bán và Bên A mua hàng hóa theo đặc tính kỹ thuật đã thỏa thuận.</p>
  <p>2. Tổng giá trị hàng hóa ghi nhận tại hợp đồng này là: <strong>{{GIA_TRI}} VNĐ</strong> <em>(Bằng chữ: {{GIA_TRI_TEXT}} đồng)</em>.</p>
  <p>3. Đơn giá trên đã bao gồm chi phí vận chuyển đến địa điểm bàn giao của Bên A và các thuế phí liên quan.</p>

  <h4>ĐIỀU 2: GIAO NHẬN VÀ THANH TOÁN</h4>
  <p>1. Thời gian giao hàng dự kiến: Ngày {{NGAY_GH_FULL}}.</p>
  <p>2. Thanh toán: Bên A thanh toán cho Bên B thành 02 đợt:</p>
  <ul>
    <li>Đợt 1: Thanh toán tạm ứng số tiền <strong>{{DA_THANH_TOAN}} VNĐ</strong> ngay sau khi ký hợp đồng.</li>
    <li>Đợt 2: Thanh toán số tiền còn lại <strong>{{CONG_NO}} VNĐ</strong> sau khi nhận hàng hóa và hóa đơn chứng từ. Hạn thanh toán: {{HAN_TT_FULL}}.</li>
  </ul>

  <h4>ĐIỀU 3: BẢO HÀNH VÀ CAM KẾT</h4>
  <p>Bên B cam kết hàng hóa mới 100%, đúng chủng loại chất lượng. Hàng hóa được bảo hành theo đúng chính sách bảo hành của nhà sản xuất.</p>

  <div class="signature-section">
    <div class="signature-box">
      <strong>ĐẠI DIỆN BÊN A</strong><br>
      <span>(Ký, ghi rõ họ tên)</span>
      <div class="signature-space"></div>
      <strong>{{NGUOI_DAI_DIEN}}</strong>
    </div>
    <div class="signature-box">
      <strong>ĐẠI DIỆN BÊN B</strong><br>
      <span>(Ký, ghi rõ họ tên)</span>
      <div class="signature-space"></div>
      <strong>Nguyễn Văn A</strong>
    </div>
  </div>
</div>
`
  },
  {
    id: "debt_reconciliation",
    name: "Biên bản Đối chiếu Công nợ",
    description: "Biên bản xác nhận tình trạng thanh toán và công nợ còn lại giữa hai bên tính đến thời điểm hiện tại.",
    content: `
<div class="contract-doc">
  <div class="contract-header">
    <div class="national-brand">
      <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
      <span class="underline-decoration">Độc lập - Tự do - Hạnh phúc</span>
    </div>
    <div class="doc-meta">
      <p><em>Hà Nội, Ngày {{CURRENT_DATE_NGAY}} tháng {{CURRENT_DATE_THANG}} năm {{CURRENT_DATE_NAM}}</em></p>
    </div>
  </div>

  <h2 class="contract-title">BIÊN BẢN ĐỐI CHIẾU CÔNG NỢ</h2>
  <p class="contract-subtitle">Căn cứ Hợp đồng số: {{MA_HD}} ký ngày {{NGAY_KY_FULL}}</p>

  <p>Hôm nay, ngày {{CURRENT_DATE_FULL}}, hai bên gồm có:</p>

  <div class="party-info">
    <p><strong>BÊN A:</strong> {{TEN_KH}}</p>
    <p><strong>Đại diện:</strong> {{NGUOI_DAI_DIEN}} &nbsp;&nbsp;&nbsp;&nbsp; <strong>Chức vụ:</strong> {{CHUC_VU}}</p>
  </div>

  <div class="party-info">
    <p><strong>BÊN B:</strong> CÔNG TY TNHH PHÁT TRIỂN CÔNG NGHỆ & GIẢI PHÁP SỐ TTTT</p>
    <p><strong>Đại diện:</strong> Nguyễn Văn A &nbsp;&nbsp;&nbsp;&nbsp; <strong>Chức vụ:</strong> Giám đốc</p>
  </div>

  <p>Cùng nhau tiến hành kiểm tra, đối chiếu số liệu thanh toán và công nợ của Hợp đồng số {{MA_HD}} ký ngày {{NGAY_KY_FULL}} với nội dung chi tiết như sau:</p>

  <table class="print-table">
    <thead>
      <tr>
        <th style="width: 5%">STT</th>
        <th style="width: 50%">Nội dung đối chiếu</th>
        <th style="width: 25%">Số tiền (VNĐ)</th>
        <th style="width: 20%">Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center;">1</td>
        <td>Tổng giá trị Hợp đồng đã ký kết</td>
        <td class="text-right">{{GIA_TRI}}</td>
        <td></td>
      </tr>
      <tr>
        <td style="text-align: center;">2</td>
        <td>Tổng số tiền Bên A đã thanh toán cho Bên B</td>
        <td class="text-right">{{DA_THANH_TOAN}}</td>
        <td></td>
      </tr>
      <tr class="font-bold">
        <td style="text-align: center;">3</td>
        <td>Số dư công nợ còn lại Bên A phải thanh toán cho Bên B</td>
        <td class="text-right" style="color: red;">{{CONG_NO}}</td>
        <td>Tính đến hiện tại</td>
      </tr>
    </tbody>
  </table>

  <h4>Kết luận:</h4>
  <p>- Tính đến ngày {{CURRENT_DATE_FULL}}, Bên A còn nợ Bên B số tiền công nợ là: <strong>{{CONG_NO}} VNĐ</strong> <em>(Bằng chữ: {{CONG_NO_TEXT}} đồng)</em>.</p>
  <p>- Bên A cam kết thanh toán đầy đủ số tiền công nợ nêu trên cho Bên B trước ngày {{HAN_TT_FULL}}.</p>
  <p>- Biên bản này được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ 01 bản làm căn cứ thanh toán.</p>

  <div class="signature-section" style="margin-top: 50px;">
    <div class="signature-box">
      <strong>ĐẠI DIỆN BÊN A</strong><br>
      <span>(Ký, ghi rõ họ tên)</span>
      <div class="signature-space"></div>
      <strong>{{NGUOI_DAI_DIEN}}</strong>
    </div>
    <div class="signature-box">
      <strong>ĐẠI DIỆN BÊN B</strong><br>
      <span>(Ký, ghi rõ họ tên)</span>
      <div class="signature-space"></div>
      <strong>Nguyễn Văn A</strong>
    </div>
  </div>
</div>
`
  }
];

// Helper to convert numbers to Vietnamese words
function readVietnameseNumber(number) {
  if (number === 0) return "Không";
  
  const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const tens = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
  
  function readGroup(group, isFirstGroup) {
    let result = "";
    const hundreds = Math.floor(group / 100);
    const remainder = group % 100;
    const ten = Math.floor(remainder / 10);
    const unit = remainder % 10;
    
    if (hundreds > 0 || !isFirstGroup) {
      result += units[hundreds] + " trăm ";
      if (ten === 0 && unit > 0) {
        result += "lẻ ";
      }
    }
    
    if (ten > 0) {
      result += tens[ten] + " ";
    } else if (hundreds > 0 && !isFirstGroup && unit > 0) {
      // already added "lẻ"
    }
    
    if (unit > 0) {
      if (unit === 1 && ten > 1) {
        result += "mốt";
      } else if (unit === 5 && ten > 0) {
        result += "lăm";
      } else if (unit === 4 && ten > 1) {
        result += "tư";
      } else {
        result += units[unit];
      }
    }
    return result.trim();
  }
  
  let numStr = Math.floor(number).toString();
  let groups = [];
  while (numStr.length > 0) {
    groups.push(parseInt(numStr.substring(Math.max(0, numStr.length - 3))));
    numStr = numStr.substring(0, Math.max(0, numStr.length - 3));
  }
  
  const scales = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
  let words = "";
  
  for (let i = 0; i < groups.length; i++) {
    if (groups[i] > 0) {
      const groupWords = readGroup(groups[i], i === groups.length - 1);
      words = groupWords + " " + scales[i] + " " + words;
    }
  }
  
  // Format the text properly
  words = words.trim().replace(/\s+/g, " ");
  if (words.length > 0) {
    words = words.charAt(0).toUpperCase() + words.slice(1);
  }
  return words;
}
