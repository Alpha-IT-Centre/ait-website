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
        "text-light bg-dark p-1 flex mx-auto text-right space-x-2 justify-end px-4 max-w-3xl lg:max-w-5xl xl:max-w-6xl",
      ),
    ],
    [
      logos.facebook("fill-current size-6 sm:size-8"),
      logos.linkedin("fill-current size-6 sm:size-8"),
      logos.x("fill-current size-6 sm:size-8"),
    ],
  )
}

pub fn header() -> Element(Msg) {
  html.div([class("bg-white py-4")], [
    html.div(
      [
        class(
          "mx-auto px-4 max-w-3xl lg:max-w-5xl xl:max-w-6xl flex justify-between items-center",
        ),
      ],
      [
        logos.alpha_it_centre("text-brand fill-current h-16"),
        html.div([class("flex space-x-1 text-lg")], [
          html.span([class("uppercase")], [text("Call us today")]),
          html.span([class("font-bold")], [text("1300 20 55 73")]),
        ]),
      ],
    ),
  ])
}

pub fn menu() -> Element(Msg) {
  html.div([class("bg-brand")], [
    html.div(
      [
        class(
          "bg-brand font-normal text-white font-light tracking-tight mx-auto px-4 max-w-3xl lg:max-w-5xl xl:max-w-6xl",
        ),
      ],
      [
        html.ul([class("flex justify-between items-center")], [
          menu_item("Home", "#", ""),
          menu_item("Telephone", "#", ""),
          menu_item("Business support", "#", ""),
          menu_item("Hosting services", "#", ""),
          menu_item("Domain services", "#", ""),
          menu_item("Datacentre services", "#", ""),
          menu_item("Contact us", "#", ""),
        ]),
      ],
    ),
  ])
}

fn menu_item(name: String, link: String, classes: String) {
  html.li([class("flex " <> classes)], [
    html.a(
      [
        attribute.href(link),
        class(
          "uppercase py-4 px-2 hover:bg-brand-dark transition-all duration-500",
        ),
      ],
      [text(name)],
    ),
  ])
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
