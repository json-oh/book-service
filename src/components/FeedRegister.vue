<template>
    <div id="feed" v-if="isLoggedIn">
        <h1>Feed Register</h1>
        <input type="text" v-model="bookTitle" placeholder="Book Title">
        <input type="text" v-model="bookAuthor" placeholder="Book Author">
        <input type="text" v-model="contents" placeholder="contents">
        <input type="text" v-model="imageUrl" placeholder="imageUrl">
        <button v-on:click="createFeed">Create Feed</button>
    </div>
</template>

<script>
    import { API, Auth } from 'aws-amplify';
    import { onAuthUIStateChange } from '@aws-amplify/ui-components'

    export default {
        name: 'FeedRegister',
        data() {
            return {
                user: undefined,
                authState: undefined,
                bookTitle: '',
                bookAuthor: '',
                contents: '',
                imageUrl: '',
            }
        },
        computed: {
            isLoggedIn(){
                return this.authState === 'signedin'
            }
        },
        methods: {
            async createFeed() {
                const { bookTitle, bookAuthor, contents, imageUrl } = this;
                // if (!bookTitle || !bookAuthor || !contents || !imageUrl) return;
                const feed = { bookTitle, bookAuthor, contents, imageUrl };
                const myInit = {
                    headers: {
                        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
                    },
                    body : feed
                };
                const apiData = await API.post('feedapi', '/feed', myInit);
                console.log({apiData})
            }
        },
        created() {
            onAuthUIStateChange((authState, authData) => {
                console.log(authData);
                this.authState = authState;
                this.user = authData;
            });
        },
        beforeDestroy() {
            return onAuthUIStateChange;
        }
    };
</script>