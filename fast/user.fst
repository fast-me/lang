user {
  username {
    regex /[A-Za-z_\-0-9]+/
    min 6
    max 25
  }
  first-name {
    regex /[A-Za-z]/
    min 2
    max 25
  }
  middle-name str?
  last-name {
    regex /[A-Za-z]/
    min 2
    max 25
  }
  
  kyc-complete bool?
  kyc reflects

  emails {
    default
    verified
    subdocument
    sort last-used // implies list selected last_selected field
  }

  phones {
    subdocument
    default
    verified
    sort last_used
  }
  addresses {
    subdocument
    default
    opt-verified
    sort last-used
  }
}
  
struct address {
  place-id
  street
  street2
  city
  state
  country
  zip
    .regex /\d+/
}