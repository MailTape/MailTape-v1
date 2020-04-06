# [MailTape](https://mailta.pe)
Feed your inspiration, every Sunday morning.

Each MailTape issue is the result of a collaborative work between a featured guest who curates the three first tracks, a curator who completes the selection, an illustrator and a writer.

Dancers, musicians, illustrators, writers, researchers, artists and creators of all kinds are following MailTape.

We're a not-for-profit art collective.

Coded with love in Berlin, Toulouse and Paris.

ImaCrea.

# You're a coder?
Feel free to make a pull request, we're very open to collaboration :)

## Building MailTape locally

### Using a local Jekyll install

Pre-requisites:
* Ruby 2.x.x installed (see [Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/))

```bash
$ gem install bundler
$ bundle i
$ bundle exec jekyll serve
```

This serves MailTape on port 4000. Visit http://127.0.0.1:4000/ to check the
changes you're making locally.

### Using Docker

If you have Docker installed, you can [run Jekyll without installing it](https://dev.to/michael/compile-a-jekyll-project-without-installing-jekyll-or-ruby-by-using-docker-4184) with the following command:

```bash
docker run --rm \
    --volume="$PWD:/srv/jekyll" \
    --volume="$PWD/vendor/bundle:/usr/local/bundle" \
    --env JEKYLL_ENV=development \
    -p 4000:4000 jekyll/jekyll:3.8 \
    jekyll serve --incremental
```

Then visit http://127.0.0.1:4000/ as described previously.