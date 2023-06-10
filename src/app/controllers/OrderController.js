
class  OrderController {
    index(req, res) {
        res.render('order')
    }
    show(req, res) {
        res.send("New detail")
    }

}

module.exports = new OrderController;