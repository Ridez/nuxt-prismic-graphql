<template>
  <section class="container">
    <b-row class="posts-row">
      <b-col class="post-col" sm="6" md="4" v-for="post in posts" :key="post.node._meta.id">
        <img class="post-img" :src="post.node.post_image.url">
        <div class="wrap-cont">
          <prismic-rich-text class="post-title" :field="post.node.title"/>
          <nuxt-link :to="'/post/' + post.node._meta.uid" class="more-btn">Read more</nuxt-link>
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { initPrismic } from "@/prismic-config"
import gql from "graphql-tag";

export default {
  async asyncData() {
    try {
      const posts = await initPrismic.query({
        query: gql`
        {
          allPosts {
            edges {
              node {
                title
                post_image
                _meta {
                  id
                  uid
                }
              }
            }
          }
        }
      `
      })

      return {
        posts: posts.data.allPosts.edges
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
