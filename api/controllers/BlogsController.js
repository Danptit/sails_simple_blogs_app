/**
 * BlogsController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	list: (req, res) => {
        Blogs.find({}).exec((err, res_blogs) => {
            if(err) {
                res.send(500, {error: "Database error"})
            }
            res.view('list', {blogs: res_blogs})
        })
    },
    add: (req, res) => {
        res.view('add')
    },
    create: (req, res) => {
        let blog = {title1:'title1', body1: 'body1', body:'body', title:'kkk'}
        if(req && req.body.title_content && req.body.body_content){
            blog.title1 = req.body.title_content;
            blog.body = req.body.body_content;
        }
        Blogs.create(blog).exec((err) => {
            if(err) res.send(500, {error: 'Db error'});
            res.redirect('/blogs/list')
        })

    },

    delete: (req, res) => {
        Blogs.destroy({id:req.params.id}).exec((err) => {
            if(err) res.send(500, {error: 'db error'});
            res.redirect('/blogs/list')
        })
    },
    edit:(req, res) => {
        Blogs.findOne({id: req.params.id}).exec((err, data) => {
            if(err) res.send(500, {error: 'db error'});
            res.view('edit', {blog: data})

        })
    },

    update:(req, res) => {
		let q = req.allParams();
		console.log(q)
        let newData = {title:req.body.title_edited, body: req.body.body_edited};
        let t = req.body.title_edited;
        let b = req.body.body_edited;

        Blogs.update({id:req.params.id}, newData).exec((err)=> {
            if(err) res.send(500, {error: 'db error'});
            
            res.redirect('blogs/list')
        })
    }
};


