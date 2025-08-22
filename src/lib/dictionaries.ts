
const lo = {
    general: {
        back: 'ຍ້ອນກັບ',
        logout: 'ອອກຈາກລະບົບ',
        description: 'ລາຍລະອຽດ',
        type: 'ປະເພດ',
        amount: 'ຈຳນວນເງິນ',
        income: 'ລາຍຮັບ',
        expense: 'ລາຍຈ່າຍ',
        saveChanges: 'ບັນທຶກການປ່ຽນແປງ',
        saveStatus: 'ບັນທຶກສະຖານະ'
    },
    menu: {
        title: 'ເມນູ',
        home: 'ໜ້າຫຼັກ',
        income: 'ລາຍຮັບ',
        expenses: 'ລາຍຈ່າຍ',
        reports: 'ລາຍງານ',
        contact: 'ຕິດຕໍ່ & Feedback'
    },
    language: {
        select: 'ເລືອກພາສາ'
    },
    profile: {
        title: 'ໂປຣໄຟລ໌',
        manage: 'ຈັດການໂປຣໄຟລ໌',
        storeSettings: 'ຕັ້ງຄ່າຮ້ານ',
        personalInfo: 'ຂໍ້ມູນສ່ວນຕົວ',
        personalInfoDesc: 'ປ່ຽນແປງຂໍ້ມູນ ແລະຮູບໂປຣໄຟລ໌ຂອງທ່ານ',
        upload: 'ອັບໂຫຼດ',
        generateWithAI: 'ສ້າງດ້ວຍ AI',
        nickname: 'ຊື່ຫຼິ້ນ',
        storeStatus: 'ສະຖານະຮ້ານ',
        storeStatusDesc: 'ຕັ້ງຄ່າສະຖານະຂອງຮ້ານທ່ານ',
        customizeLogo: 'ປັບແຕ່ງໂລໂກ້',
        customizeLogoDesc: 'ເລືອກໄອຄອນໃໝ່ສຳລັບໂລໂກ້ຮ້ານ'
    },
    dashboard: {
        welcomeMessage: "ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ຮ້ານ BoyMo Pizza",
        searchPlaceholder: "ຄົ້ນຫາທຸລະກຳ...",
        addIncome: "ເພີ່ມລາຍຮັບ",
        addExpense: "ເພີ່ມລາຍຈ່າຍ",
        reports: "ລາຍງານ",
        todaySummary: "ສະຫຼຸບຂອງມື້ນີ້",
        todayIncome: "ລາຍຮັບມື້ນີ້",
        incomeFromSales: "ຂໍ້ມູນຈາກການຂາຍ",
        todayExpense: "ລາຍຈ່າຍມື້ນີ້",
        expenseFromPurchases: "ຂໍ້ມູນຈາກການຊື້",
        todayProfit: "ກຳໄລມື້ນີ້",
        profitHint: "ລາຍຮັບ - ລາຍຈ່າຍ",
        recentTransactions: "ທຸລະກຳລ່າສຸດ",
        latestItems: "ລາຍການລ່າສຸດ",
        latestItemsDesc: "ສະແດງທຸລະກຳຫຼ້າສຸດຂອງທ່ານ."
    }
};

const en = {
    general: {
        back: 'Back',
        logout: 'Logout',
        description: 'Description',
        type: 'Type',
        amount: 'Amount',
        income: 'Income',
        expense: 'Expense',
        saveChanges: 'Save Changes',
        saveStatus: 'Save Status'
    },
    menu: {
        title: 'Menu',
        home: 'Home',
        income: 'Income',
        expenses: 'Expenses',
        reports: 'Reports',
        contact: 'Contact & Feedback'
    },
    language: {
        select: 'Select Language'
    },
    profile: {
        title: 'Profile',
        manage: 'Manage Profile',
        storeSettings: 'Store Settings',
        personalInfo: 'Personal Information',
        personalInfoDesc: 'Change your information and profile picture',
        upload: 'Upload',
        generateWithAI: 'Generate with AI',
        nickname: 'Nickname',
        storeStatus: 'Store Status',
        storeStatusDesc: 'Set the status of your store',
        customizeLogo: 'Customize Logo',
        customizeLogoDesc: 'Choose a new icon for your store logo'
    },
    dashboard: {
        welcomeMessage: "Welcome to BoyMo Pizza",
        searchPlaceholder: "Search transactions...",
        addIncome: "Add Income",
        addExpense: "Add Expense",
        reports: "Reports",
        todaySummary: "Today's Summary",
        todayIncome: "Today's Income",
        incomeFromSales: "Data from sales",
        todayExpense: "Today's Expense",
        expenseFromPurchases: "Data from purchases",
        todayProfit: "Today's Profit",
        profitHint: "Income - Expense",
        recentTransactions: "Recent Transactions",
        latestItems: "Latest Items",
        latestItemsDesc: "Showing your latest transactions."
    }
};

const th = {
    general: {
        back: 'ย้อนกลับ',
        logout: 'ออกจากระบบ',
        description: 'รายละเอียด',
        type: 'ประเภท',
        amount: 'จำนวนเงิน',
        income: 'รายรับ',
        expense: 'รายจ่าย',
        saveChanges: 'บันทึกการเปลี่ยนแปลง',
        saveStatus: 'บันทึกสถานะ'
    },
    menu: {
        title: 'เมนู',
        home: 'หน้าหลัก',
        income: 'รายรับ',
        expenses: 'รายจ่าย',
        reports: 'รายงาน',
        contact: 'ติดต่อ & Feedback'
    },
    language: {
        select: 'เลือกภาษา'
    },
    profile: {
        title: 'โปรไฟล์',
        manage: 'จัดการโปรไฟล์',
        storeSettings: 'ตั้งค่าร้านค้า',
        personalInfo: 'ข้อมูลส่วนตัว',
        personalInfoDesc: 'เปลี่ยนแปลงข้อมูลและรูปโปรไฟล์ของคุณ',
        upload: 'อัปโหลด',
        generateWithAI: 'สร้างด้วย AI',
        nickname: 'ชื่อเล่น',
        storeStatus: 'สถานะร้านค้า',
        storeStatusDesc: 'ตั้งค่าสถานะของร้านค้าของคุณ',
        customizeLogo: 'ปรับแต่งโลโก้',
        customizeLogoDesc: 'เลือกไอคอนใหม่สำหรับโลโก้ร้านค้าของคุณ'
    },
    dashboard: {
        welcomeMessage: "ยินดีต้อนรับสู่ร้าน BoyMo Pizza",
        searchPlaceholder: "ค้นหาธุรกรรม...",
        addIncome: "เพิ่มรายรับ",
        addExpense: "เพิ่มรายจ่าย",
        reports: "รายงาน",
        todaySummary: "สรุปวันนี้",
        todayIncome: "รายรับวันนี้",
        incomeFromSales: "ข้อมูลจากการขาย",
        todayExpense: "รายจ่ายวันนี้",
        expenseFromPurchases: "ข้อมูลจากการซื้อ",
        todayProfit: "กำไรวันนี้",
        profitHint: "รายรับ - รายจ่าย",
        recentTransactions: "ธุรกรรมล่าสุด",
        latestItems: "รายการล่าสุด",
        latestItemsDesc: "แสดงธุรกรรมล่าสุดของคุณ"
    }
};

const zh = {
    general: {
        back: '返回',
        logout: '登出',
        description: '描述',
        type: '类型',
        amount: '金额',
        income: '收入',
        expense: '支出',
        saveChanges: '保存更改',
        saveStatus: '保存状态'
    },
    menu: {
        title: '菜单',
        home: '首页',
        income: '收入',
        expenses: '支出',
        reports: '报告',
        contact: '联系与反馈'
    },
    language: {
        select: '选择语言'
    },
    profile: {
        title: '个人资料',
        manage: '管理个人资料',
        storeSettings: '店铺设置',
        personalInfo: '个人信息',
        personalInfoDesc: '更改您的信息和头像',
        upload: '上传',
        generateWithAI: '用AI生成',
        nickname: '昵称',
        storeStatus: '店铺状态',
        storeStatusDesc: '设置您的店铺状态',
        customizeLogo: '自定义徽标',
        customizeLogoDesc: '为您的商店徽标选择一个新图标'
    },
    dashboard: {
        welcomeMessage: "欢迎来到 BoyMo 披萨店",
        searchPlaceholder: "搜索交易...",
        addIncome: "增加收入",
        addExpense: "增加支出",
        reports: "报告",
        todaySummary: "今日摘要",
        todayIncome: "今日收入",
        incomeFromSales: "来自销售的数据",
        todayExpense: "今日支出",
        expenseFromPurchases: "来自采购的数据",
        todayProfit: "今日利润",
        profitHint: "收入 - 支出",
        recentTransactions: "最近的交易",
        latestItems: "最新项目",
        latestItemsDesc: "显示您最新的交易。"
    }
};

const vi = {
    general: {
        back: 'Quay lại',
        logout: 'Đăng xuất',
        description: 'Sự miêu tả',
        type: 'Loại',
        amount: 'Số tiền',
        income: 'Thu nhập',
        expense: 'Chi phí',
        saveChanges: 'Lưu thay đổi',
        saveStatus: 'Lưu trạng thái'
    },
    menu: {
        title: 'Thực đơn',
        home: 'Trang chủ',
        income: 'Thu nhập',
        expenses: 'Chi phí',
        reports: 'Báo cáo',
        contact: 'Liên hệ & Phản hồi'
    },
    language: {
        select: 'Chọn ngôn ngữ'
    },
    profile: {
        title: 'Hồ sơ',
        manage: 'Quản lý hồ sơ',
        storeSettings: 'Cài đặt cửa hàng',
        personalInfo: 'Thông tin cá nhân',
        personalInfoDesc: 'Thay đổi thông tin và ảnh hồ sơ của bạn',
        upload: 'Tải lên',
        generateWithAI: 'Tạo bằng AI',
        nickname: 'Biệt danh',
        storeStatus: 'Trạng thái cửa hàng',
        storeStatusDesc: 'Đặt trạng thái của cửa hàng của bạn',
        customizeLogo: 'Tùy chỉnh Logo',
        customizeLogoDesc: 'Chọn một biểu tượng mới cho logo cửa hàng của bạn'
    },
    dashboard: {
        welcomeMessage: "Chào mừng đến với BoyMo Pizza",
        searchPlaceholder: "Tìm kiếm giao dịch...",
        addIncome: "Thêm thu nhập",
        addExpense: "Thêm chi phí",
        reports: "Báo cáo",
        todaySummary: "Tóm tắt hôm nay",
        todayIncome: "Thu nhập hôm nay",
        incomeFromSales: "Dữ liệu từ bán hàng",
        todayExpense: "Chi phí hôm nay",
        expenseFromPurchases: "Dữ liệu từ mua hàng",
        todayProfit: "Lợi nhuận hôm nay",
        profitHint: "Thu nhập - Chi phí",
        recentTransactions: "Giao dịch gần đây",
        latestItems: "Các mục mới nhất",
        latestItemsDesc: "Hiển thị các giao dịch mới nhất của bạn."
    }
};


export const dictionaries = {
  lo,
  en,
  th,
  zh,
  vi
};

export type Dictionary = typeof lo;
