

struct urls {
  static verify-email(code) {
    `/email/verify/${code}`
  }

  static verify-phone(code) {
    `/phone/verify/${code}`
  }
}