const cuid = import(@paralleldrive/cuid2) {
  fn createId(): identifier
}

sscalar identifier {
  fn new: identifier {
    cuid.createId()
  }
}
