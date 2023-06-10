
class  AccountController {
    index(req, res) {
        res.render('account')
    }
    show(req, res) {
        res.send("New detail")
    }

}

module.exports = new AccountController;