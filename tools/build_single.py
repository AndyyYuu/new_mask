#!/usr/bin/env python3
"""把游戏打成一个不带外部文件的 HTML 片段（用于发布成 Claude Artifact 预览）。
用法：python3 tools/build_single.py 输出路径.html
声音文件不内联，发布时作为 audio/ 目录下的附带文件。"""
import pathlib, sys
root = pathlib.Path(__file__).resolve().parent.parent
read = lambda p: (root / p).read_text(encoding='utf-8')
out = f'''<title>第十一号失主</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Long+Cang&family=Noto+Serif+SC:wght@400;700&family=ZCOOL+XiaoWei&display=swap">
<style>
{read('css/game.css')}
</style>
<div id="app"></div>
<script>window.AUDIO_BASE = 'audio/';</script>
<script>
{read('js/art.js')}
</script>
<script>
{read('js/story.js')}
</script>
<script>
{read('js/game.js')}
</script>
'''
pathlib.Path(sys.argv[1]).write_text(out, encoding='utf-8')
print('written', sys.argv[1], len(out), 'bytes')
