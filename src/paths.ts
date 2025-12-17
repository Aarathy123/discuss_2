const paths = {
  getHomePath() {
    return "/";
  },
  topicShowPath(slug: string) {
    return `/topics/${slug}`;
  },
  postCreatePath(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShowPath(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  }
};

export default paths;