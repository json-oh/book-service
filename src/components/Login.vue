<template>
  <v-container fill-height>
    <v-row class="my-6" justify="center">
      <v-cols cols="12">
        <v-img src="../assets/logo.png"></v-img>
      </v-cols>
    </v-row>
    <v-row justify="center">
      <amplify-authenticator username-alias="email">
        <amplify-sign-up
          slot="sign-up"
          username-alias="email"
          :form-fields.prop="formFields"
        ></amplify-sign-up>
        <amplify-sign-in
          slot="sign-in"
          username-alias="email"
        ></amplify-sign-in>
      </amplify-authenticator>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data: function () {
    return {
      formFields: [
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
        },
      ],
    };
  },
};
</script>
