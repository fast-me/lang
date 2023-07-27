

struct urls {
  static fn verify-email(code) {
    `/email/verify/${code}`
  }

  static fn verify-phone(code) {
    `/phone/verify/${code}`
  }
}