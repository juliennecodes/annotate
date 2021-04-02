# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

3.times do |i|
    image = Image.create(name: "Bear", url: "https://i.pinimg.com/564x/23/75/bd/2375bdd087e7dbec4df67e7e3584a1d8.jpg")
    image.annotations.create(body: "Whimmy-wham-wham-wazzle!")
    image.annotations.create(body: "Welcome, my friends, to the wondrous world of whimsy that we like to call \"Slurms Centralised Industrial Fabrication Unit\"")
    image.annotations.create(body: "Why, those are the Grunka Lunkas. They work here in the Slurm factory.")
end

3.times do |i|
    image = Image.create(name: "Bear", url: "https://i.pinimg.com/564x/f5/31/33/f531331d7e1f9df020ad7758aa62a51b.jpg")
    image.annotations.create(body: "Whimmy-wham-wham-wazzle!")
    image.annotations.create(body: "Welcome, my friends, to the wondrous world of whimsy that we like to call \"Slurms Centralised Industrial Fabrication Unit\"")
    image.annotations.create(body: "Why, those are the Grunka Lunkas. They work here in the Slurm factory.")
end

3.times do |i|
    image = Image.create(name: "Bear", url: "https://i.pinimg.com/564x/26/3c/39/263c390ca20c23f4fe49b282c6a52ad4.jpg")
    image.annotations.create(body: "Whimmy-wham-wham-wazzle!")
    image.annotations.create(body: "Welcome, my friends, to the wondrous world of whimsy that we like to call \"Slurms Centralised Industrial Fabrication Unit\"")
    image.annotations.create(body: "Why, those are the Grunka Lunkas. They work here in the Slurm factory.")
end