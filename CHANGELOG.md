# Changelog

## [0.1.1]

### Changed

- Changed the default remove button `aria-label` from "Remove tag {tag}" to
  "Remove {tag}" so screen reader output is clearer and avoids unnecessary
  jargon.

## [0.1.0]

### Changed

- **Breaking:** requires Svelte 5. Svelte 4 is no longer supported.
- **Breaking:** the `input` event (`on:input`, read via `event.detail`) has been
  replaced with an `oninput` callback prop:

  ```svelte
  <!-- before -->
  <TagsInput bind:tags on:input={(event) => console.log(event.detail)} />

  <!-- after -->
  <TagsInput bind:tags oninput={(tags) => console.log(tags)} />
  ```

### Added

- `removeTagButtonAriaLabelPrefix` prop (default `'Remove tag'`). Each remove
  button now gets an `aria-label` built from this prefix and the tag's text
  (e.g. "Remove tag urgent"), so screen reader users can tell tags apart.
  Previously every button announced only "✕".
