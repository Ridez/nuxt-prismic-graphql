<template>
  <section class="container">
    <b-row class="posts-row">
      <b-col class="post-col" sm="6" md="4" v-for="(post, index) in posts.data.allPosts.edges" :key="index">
        <img class="post-img" :src="post.node.post_image.url">
        <div class="wrap-cont">
          <prismic-rich-text class="post-title" :field="post.node.title"/>
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://your-repository-name.prismic.io/graphql",
  }),
  cache: new InMemoryCache()
});

export default {
  async asyncData() {
    try {
      const posts = await client.query({
        query: gql`
        {
          allPosts {
            edges {
              node {
                title
                desc
                post_image
              }
            }
          }
        }
      `
      })

      return {
        posts
      }
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
  .posts-row {
    margin-top: 100px;
    .post-col {
      margin-bottom: 30px;
      .post-img {
        width: 100%;
      }
      .wrap-cont {
        background-color: #fafafa;
        padding: 15px;
        .post-title {
          h1 {
            font-size: 2rem;
          }
        }
      }
    }
  }
</style>
