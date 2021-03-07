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
                        Please login to continue
                    </v-card-text>
                    <v-card-actions>
                        <v-btn outlined rounded text to="/overview">
                            Button
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "Login",
    components: {},
};
</script>
