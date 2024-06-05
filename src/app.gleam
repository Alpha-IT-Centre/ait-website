import app/sections
import app/types.{
  type Model, type Msg, CacheUpdatedMessage, Model, UserUpdatedMessage,
}
import gleam/option.{None, Some}
import lustre
import lustre/effect.{type Effect}
import lustre/element.{type Element}
import lustre/element/html

pub fn main() {
  let app = lustre.application(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
}

// MODEL -----------------------------------------------------------------------

fn init(_flags) -> #(types.Model, Effect(types.Msg)) {
  #(Model(message: None), read_localstorage("message"))
}

// UPDATE ----------------------------------------------------------------------

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    UserUpdatedMessage(input) -> #(
      Model(message: Some(input)),
      write_localstorage("message", input),
    )
    CacheUpdatedMessage(Ok(message)) -> #(
      Model(message: Some(message)),
      effect.none(),
    )
    CacheUpdatedMessage(Error(_)) -> #(model, effect.none())
  }
}

fn read_localstorage(key: String) -> Effect(Msg) {
  effect.from(fn(dispatch) {
    do_read_localstorage(key)
    |> CacheUpdatedMessage
    |> dispatch
  })
}

@external(javascript, "./app.ffi.mjs", "read_localstorage")
fn do_read_localstorage(_key: String) -> Result(String, Nil) {
  Error(Nil)
}

fn write_localstorage(key: String, value: String) -> Effect(msg) {
  effect.from(fn(_) { do_write_localstorage(key, value) })
}

@external(javascript, "./app.ffi.mjs", "write_localstorage")
fn do_write_localstorage(_key: String, _value: String) -> Nil {
  Nil
}

// VIEW ------------------------------------------------------------------------

fn view(_: Model) -> Element(Msg) {
  html.div([], [
    sections.socials(),
    sections.header(),
    sections.menu(),
    sections.carousel(),
    sections.info(),
  ])
}
