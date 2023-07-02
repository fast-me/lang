const argon2 = import('argon2') {
  fn hash(str): str
  fn verify(hash, str): boolean
}

sscalar hashed {
  fn seralizeDb() {
    await argon2.hash(this)
  }
  fn compare(value) {
    await argon2.verify()
  }
}

sscalar secstr {
  
}