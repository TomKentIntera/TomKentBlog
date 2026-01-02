<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ config('app.name', 'Tom Kent Blog') }}</title>
    @php
      // Find the built assets in public directory
      $assetsDir = public_path('assets');
      if (is_dir($assetsDir)) {
        $jsFiles = array_filter(glob($assetsDir . '/*.js'), function($file) {
          return strpos(basename($file), 'index') === 0;
        });
        $cssFiles = array_filter(glob($assetsDir . '/*.css'), function($file) {
          return strpos(basename($file), 'index') === 0;
        });
        // If no index files, get all JS/CSS files
        if (empty($jsFiles)) {
          $jsFiles = glob($assetsDir . '/*.js');
        }
        if (empty($cssFiles)) {
          $cssFiles = glob($assetsDir . '/*.css');
        }
      } else {
        $jsFiles = [];
        $cssFiles = [];
      }
    @endphp
    @if (!empty($cssFiles))
      @foreach ($cssFiles as $cssFile)
        <link rel="stylesheet" href="{{ asset('assets/' . basename($cssFile)) }}">
      @endforeach
    @endif
  </head>
  <body>
    <div id="root"></div>
    @if (!empty($jsFiles))
      @foreach ($jsFiles as $jsFile)
        <script type="module" src="{{ asset('assets/' . basename($jsFile)) }}"></script>
      @endforeach
    @endif
  </body>
</html>

