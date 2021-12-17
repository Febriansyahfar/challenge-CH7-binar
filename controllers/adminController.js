const { User } = require("../models");
const passport = require("../lib/passport");

module.exports = {
  viewSignUp: (req, res) => {
    res.render("register", {
      title: "Chapter 7 | Register",
    });
  },
  signUp: async (req, res, next) => {
    try {
      await User.register(req.body);
      res.redirect("/admin/signin");
    } catch (error) {
      res.redirect("/admin/register");
      next(error);
    }
  },
  viewSignIn: (req, res) => {
    res.render("index", {
      title: "Chapter 7 | Login",
    });
  },
  signIn: passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/",
    failureFlash: true,
  }),

  viewDashboard: async (req, res) => {
    try {
      const dashboard = await User.findAll();
      res.render("admin/dashboard/index", {
        title: "Chapter 7 | Dashboard",
        dashboard,
      });
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },

  viewUSer: async (req, res) => {
    try {
      const user = await User.findAll();
      res.render("admin/dashboard/user/view_users", {
        title: "Chapter 7 | Dashboard",
        user,
      });
    } catch (error) {
      res.redirect("/admin/user");
    }
  },

  addUser: async (req, res) => {
    try {
      await User.register(req.body);
      res.redirect("/admin/user");
    } catch (error) {
      res.redirect("/admin/user");
    }
  },

  viewEditUser: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.params.id },
      });
      res.render("admin/dashboard/user/view_edit_user", {
        title: "Chapter 7 | Dashboard",
        user,
      });
    } catch (error) {
      res.redirect("/admin/user/edit");
    }
  },
  editUser: async (req, res) => {
    try {
      await User.update(
        {
          username: req.body.username,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then(() => res.redirect("/admin/user"));
    } catch (error) {
      res.redirect("/admin/user");
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.destroy({
        where: { id: req.params.id },
      });
      res.redirect("/admin/user");
    } catch (error) {
      res.redirect("/admin/user");
    }
  },
};
