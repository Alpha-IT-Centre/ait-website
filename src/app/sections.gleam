import app/logos
import app/sections/info
import app/types.{type Msg}
import lustre/attribute.{class}
import lustre/element.{type Element, text}
import lustre/element/html

pub fn socials() -> Element(Msg) {
  html.div(
    [
      class(
        "text-light bg-dark p-1 flex text-right space-x-2 justify-end max-w-5xl xl:max-w-6xl 2xl:max-w-8xl",
      ),
    ],
    [
      logos.facebook("fill-current size-8 border border-white"),
      logos.facebook("fill-current size-8 border border-white"),
    ],
  )
}

pub fn header() -> Element(Msg) {
  html.div([class("bg-white")], [text("header")])
}

pub fn menu() -> Element(Msg) {
  html.div([class("bg-brand")], [text("menu")])
}

pub fn carousel() -> Element(Msg) {
  html.div([], [text("carousel")])
}

pub fn contact_form() -> Element(Msg) {
  html.div([class("bg-darker")], [text("contact form")])
}

pub fn info() -> Element(Msg) {
  html.div([class("bg-white grid gap-2 md:grid-cols-2 p-2")], [
    info.bus_support(),
    info.domain_services(),
    info.hosting(),
    info.data_centre(),
  ])
}

pub fn about_us() -> Element(Msg) {
  html.div([class("bg-darker")], [text("about us")])
}

pub fn domain_search() -> Element(Msg) {
  html.div([class("bg-brand")], [text("domain search")])
}

pub fn reviews() -> Element(Msg) {
  html.div([class("bg-white")], [text("reviews")])
}

pub fn footer() -> Element(Msg) {
  html.div([class("bg-dark")], [text("footer")])
}

pub fn copyright() -> Element(Msg) {
  html.div([class("bg-mid")], [text("copyright")])
}
