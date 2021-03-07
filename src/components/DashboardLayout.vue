<template>
    <div>
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Vuetify-Todo
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Best Todo Ever!
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="primary" prominent src="space.jpg" fade-img-on-scroll>
            <template v-slot:img="{ props }">
                <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
            </template>

            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Vuetify Todo</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </div>
</template>

<script>
export default {
    name: "DashboardLayout",
    data: function() {
        return {
            drawer: null,
            items: [
                { title: "Dashboard", icon: "mdi-format-list-checks", to: "/dashboard" },
                { title: "Overview", icon: "mdi-format-list-checks", to: "/overview" },
                { title: "Login", icon: "mdi-help-box", to: "/login" },
            ],
        };
    },
};
</script>
