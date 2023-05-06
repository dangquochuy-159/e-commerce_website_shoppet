function admin(req, res, next) {
    if (req.session && req.session.adminId) {
        // Admin đã đăng nhập, cho phép truy cập
        next();
    } else {
        // Admin chưa đăng nhập, chuyển hướng đến trang đăng nhập
        res.redirect('/admin/dang-nhap');
    }
}

function customer(req, res, next) {
    if (req.session && req.session.customerID) {
        // Người dùng đã đăng nhập, cho phép truy cập
        next();
    } else {
        // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        res.redirect('/dang-nhap');
    }
}

module.exports = {
    admin,
    customer
}