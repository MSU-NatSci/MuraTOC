component output="false" extends="mura.cfobject" {
    function onRenderStart(m){
        m.addToHTMLHeadQueue(
            '<script src="#m.siteConfig().getThemeAssetPath()#/display_objects/toc/toc.js" async></script>');
    }
}
