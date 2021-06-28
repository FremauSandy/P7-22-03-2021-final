import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [
		// à l'arrivée d'un utilisateur
		{
			path: "/users/sign",
			name: "Sign",
			component: () => import("../views/Sign")
		},
		{
			path: "/users/log",
			name: "Log",
			component: () => import("../views/Log")
		},
		// si connection , direction le mur de publications
		{
			path: "/wall",
			name: "Wall",
			component: () => import("../views/Wall"),
			meta: { requiresAuth: true }
		},
		//avec l'userId = accés profil utilisateurs
		{
			path: "/users/profile",
			name: "Userprofil",
			component: () => import("../views/Userprofil"),
			meta: { requiresAuth: true }
		},
		//acces aux profil d'un autre utilisateur
		{
			path: "/users/profile/",
			name: "Randomprofile",
			component: () => import("../views/Randomprofile")
		}
	]
});

router.beforeEach((to, _, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem("jwt") !== null) {
			next();
		} else {
			next({ name: "Sign" });
		}
	} else {
		next();
	}
});

export default router;
