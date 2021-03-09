<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-20">
                    <v-toolbar dark>
                        <v-toolbar-title>
                            Welcome To Athena, Please Login
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatem ratione, sit ab
                            eaque itaque eveniet porro nobis repellat eligendi ea, blanditiis iure. Facere, quibusdam
                            consectetur sed laudantium quas nulla.
                        </p>
                        <div v-if="loading" class="text-center">
                            <v-progress-circular size="25" color="success" indeterminate dark />
                        </div>
                        <v-alert dense elevation="24" type="error" v-else-if="error"
                            >{{ error }}<br />Please refresh the page to try again</v-alert
                        >
                        <div v-else>
                            <a @click="startAuthFlow">
                                <v-img
                                    src="https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-white-large.png"
                                    max-height="45"
                                    max-width="270"
                                    class="mx-auto"
                                />
                            </a>
                        </div>
                    </v-card-text>
                    <v-card-actions> </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Login",
    data: function() {
        return {
            loading: true,
            auth: null,
            error: null,
        };
    },
    apollo: {
        auth: {
            query: require("@/graphql/Auth.graphql"),
            result({ data, loading, error }, key) {
                if (loading) {
                    return;
                }
                if (error) {
                    const { message } = error;
                    this.error = message;
                    this.loading = false;
                    return;
                }

                this.auth = data.auth;
                this.loading = loading;
            },
        },
        $subscribe: {
            authStatus: {
                query: require("@/graphql/AuthStatus.graphql"),
                variables() {
                    return {
                        state: this.auth.state,
                    };
                },
                async result({ data }) {
                    const { authStatus } = data;
                    if (authStatus.status == "pending") {
                        return;
                    }

                    if (authStatus.status != "completed") {
                        this.error =
                            "Looks like something went wrong with your login attempt please try again by refreshing the page";
                        return;
                    }

                    this.storeToken(authStatus.token);

                    await this.$apollo
                        .query({
                            query: require("@/graphql/Member.graphql"),
                        })
                        .then(async (response) => {
                            await this.storeUser(response.member);
                            await this.$router.push("/dashboard");
                        })
                        .catch((error) => {
                            this.error = error.message;
                        });
                },
                skip: true,
            },
        },
    },
    methods: {
        ...mapActions(["storeToken", "storeUser"]),
        startAuthFlow() {
            this.openAuthPopup();
            this.$apollo.subscriptions.authStatus.start();
        },
        openAuthPopup() {
            window.open(this.auth.url, "popup", "width=600,height=600");
        },
    },
};
</script>
