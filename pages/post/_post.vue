<template>
  <div class="project-container container">
    <nuxt-link to="/" class="back-btn">Go back to posts</nuxt-link>
    <div class="wrap-cont">
      <img class="post-img" :src="post.post_image.url">
      <prismic-rich-text class="post-title" :field="post.title"/>
      <prismic-rich-text class="post-desc" :field="post.desc"/>
    </div>
  </div>
</template>

<script>
import { initPrismic } from "@/prismic-config"
import gql from "graphql-tag";

export default {
  async asyncData({ params }) {
    try {
      const post = await initPrismic.query({
        query: gql`
        {
          allPosts(uid: "${params.post}") {
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
        post: post.data.allPosts.edges[0].node
      }
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
  .project-container {
    margin-top: 100px;
    .back-btn {
      display: block;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
    .wrap-cont {
      .post-img {
        width: 100%;
      }
      .post-title {
        margin-top: 30px;
      }
    }
  }
</style>