import  { createRouter,createWebHistory } from 'vue-router';
import Main from '../views/MainUser.vue';

//路由创建
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    path: 'showUser',
                    component: () => import('../views/ShowUser.vue'),
                },
                {
                    path: 'addUser',
                    component: () => import('../views/SaveUser.vue'),
                },
                {
                    path: 'uploadUser',
                    component: () => import('../views/UploadUser.vue'),
                },
            ]
        },
        
    ],
});
export default router