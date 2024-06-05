import gleam/option.{type Option}

pub type Model {
  Model(message: Option(String))
}

pub type Msg {
  UserUpdatedMessage(String)
  CacheUpdatedMessage(Result(String, Nil))
}
