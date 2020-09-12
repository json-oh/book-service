<template>
    <amplify-authenticator usernameAlias="email">
        <amplify-sign-up
                slot="sign-up"
                usernameAlias="email"
                :form-fields.prop="formFields"
        ></amplify-sign-up>
        <amplify-sign-in
                slot="sign-in"
                usernameAlias="email"
                :form-fields.prop="formFields"
        ></amplify-sign-in>
        <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
</template>
<script>
    export default {
        name : "login",
        data : function () {
            return {
                formFields : [
                    {
                        type: "email",
                        label: "Email",
                        placeholder: "email@aws.com",
                        required: true,
                    },
                    {
                        type: "password",
                        label: "Password",
                        placeholder: "password",
                        required: true,
                    }
                ]
            }
        }
    }
</script>