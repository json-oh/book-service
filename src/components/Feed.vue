<template>
    <div id="feed">
        <h1>myFeeds</h1>
        <table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>contents</th>
                    <th>image</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="feed in feeds" v-bind:key="feed" >
                    <td>{{feed.bookTitle}}</td>
                    <td>{{feed.bookAuthor}}</td>
                    <td>{{feed.contents}}</td>
                    <td>{{feed.imageUrl}}</td>
                </tr>
            </tbody>
        </table>

        <h1>Feed</h1>
        <input type="text" v-model="bookTitle" placeholder="Book Title">
        <input type="text" v-model="bookAuthor" placeholder="Book Author">
        <input type="text" v-model="contents" placeholder="contents">
        <input type="text" v-model="imageUrl" placeholder="imageUrl">
        <button v-on:click="createFeed">Create Feed</button>
    </div>
</template>

<script>
    import { API, Auth } from 'aws-amplify';

    export default {
        name: 'Feed',
        data() {
            return {
                bookTitle: '',
                bookAuthor: '',
                contents: '',
                imageUrl: '',
                feeds: []
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
            },
            async getMyFeeds() {
                const myInit = {
                    headers: {
                        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
                    }
                };
                const feedData = await API.get('feedapi', '/feed', myInit);
                this.feeds = feedData
            }
        },
        created() {
            this.getMyFeeds()
        }
    };
</script>