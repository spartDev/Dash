# Compass & compass plugin.
require "compass"
#require "compass-growl"

# Project Assets Location
http_path = "/"
css_dir = "assets/stylesheets/css"
sass_dir = "assets/stylesheets/sass"
images_dir = "assets/images"
javascripts_dir = "assets/javascripts"
fonts_dir = "assets/fonts"

# #nable relative paths to assets via compass helper functions.
relative_assets = true

# Enable or disable line comments
line_comments = true

# Color output
color_output = false


def growl(msg)
  GNTP.notify({
    :title    => "Compass",
    :text     => msg,
    :icon     => "file://#{CompassGrowl::ICON}"
  })
end

on_sprite_saved do |filename|
  growl('Sprite: ' + filename + ' complete')
end


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
#
# sass-convert -R --from scss --to sass scss scss && rm -rf sass && mv scss sass
