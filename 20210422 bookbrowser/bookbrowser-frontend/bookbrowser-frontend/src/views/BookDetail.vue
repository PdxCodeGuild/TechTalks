<template>
    <v-container style="max-width:800px">
        <h1>Book Detail</h1>
        <div class="d-flex flex-row justify-center">
            <v-img :src="book.image" contain max-width="200px" max-height="400px"></v-img>
            <div class="d-flex flex-column">
                <h1>{{ book.title }}</h1>
                <span>By {{ book.author }}</span>
                <span>{{ book.country }} / {{ book.language }}</span>
            </div>
        </div>
    </v-container>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'BookDetail',
        data: () => ({
            book: {
                id: 0,
                title: "",
                author: "",
                country: "",
                image: "",
                language: "",
                pages: 0,
                url: "",
                year: 0
            }
        }),
        methods: {
            getBook: function() {
                let book_id = this.$route.params.book_id
                console.log(book_id)
                axios({
                    method: 'get',
                    url: 'http://localhost:5000/books/' + book_id + '/'
                }).then(response => {
                    // console.log(response.data)
                    this.book = response.data
                })
            }
        },
        created: function() {
            this.getBook()
        }
    }
</script>