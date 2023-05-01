module.exports = function requireLogin(req, res, next) {
    if (req.session && req.session.adminId) {
        // Người dùng đã đăng nhập, cho phép truy cập
        next();
    } else {
        // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        res.redirect('/admin/dang-nhap');
    }
}