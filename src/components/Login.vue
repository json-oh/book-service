<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" align="center">
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
      </v-col>
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
