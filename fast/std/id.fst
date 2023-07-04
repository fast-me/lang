const cuid = import(@paralleldrive/cuid2) {
  fn createId(): identifier
}

fn newIdentifier(): identifier {
  cuid.createId()
}

sscalar identifier {
}
