<template>
    <v-container class="center">
        <h1>Book List</h1>
        <v-container>
            <v-row>
                <v-col sm="12" md="10">
                    <v-text-field
                        v-model="search_text"
                    ></v-text-field>
                </v-col>
                <v-col sm="12" md="2">
                    <v-btn @click="getBooks" color="primary">Search</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <div class="d-flex flex-wrap">
            <v-card
                class="mx-auto my-12"
                max-width="374"
                v-for="book in books"
            >

                <v-img
                height="250"
                :src="book.image"
                ></v-img>

                <v-card-title>{{ book.title }}</v-card-title>

                <v-card-text>
                    By {{ book.author }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" :href="'/books/' + book.id">View Details</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'BookList',
        data: () => ({
            books: [],
            search_text: ''
        }),
        methods: {
            getBooks: function() {
                axios({
                    method: 'get',
                    url: 'http://localhost:5000/books/',
                    params: {
                        search: this.search_text
                    }
                }).then(response => {
                    this.books = response.data.books
                })
            }
        },
        created: function() {
            this.getBooks()
        }
    }
</script>