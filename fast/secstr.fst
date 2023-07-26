const argon2 = import(argon2) {
  fn async hash(str): str
  fn async verify(hash, str): bool
}

behavior hashed {
  fn db-serialize() {
    argon2.hash(this)
  }
  fn db-==(value) {
    argon2.verify(this, value)
  }
}

sscalar secstr {
  
}