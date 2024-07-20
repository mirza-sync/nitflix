# Nitflix

A Netflix clone made with Next.js.

> Stop nitpicking and choose a movie already!

## Dev Logs

- Okay, this time this Next.js project will fetch data from TMDB API instead having a database (Actually I don't want the hassle to insert hundreds of movie data into the db). I'm using Next.js to provide user with improved UX. SSR comes with the benefit of faster First-Contentful-Paint (FCP), faster Time-To-Interactive (TTI) and smaller js bundle size. (But the actual reason I'm using Next.js is because of the file-based routing lol 🤭). So which part to SSR? The header and footer, duh... Will my project have one? I don't know yet.

- I want to setup react-query and axios since I'm gonna call external API. So I'm just gonna wrap the root layout's children with react-query provider (`QueryClientProvider`), and put `use client` on top. But react-query is client component. Since the parent/wrapper is client component, all the child underneath it will be client component too. This will defeat the purpose of Next.js which is to use SSR! The solution is to refactor out `QueryClientProvider` into it's own component file (I call it `ReactQueryProvider`), then add the `use client` in it. Lastly, wrap the root layout with `ReactQueryProvider`.
  - Wait a minute... the provider is still client component, everything that it wraps will still be client too right? Nope. Because..... It was a little hard to explain, but I managed to understand it from [this article](https://www.joshwcomeau.com/react/server-components/#workarounds-7).
