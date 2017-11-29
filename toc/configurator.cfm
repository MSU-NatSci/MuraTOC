<cfparam name="objectParams.title" default="Table of Contents" />
<cfparam name="objectParams.listType" default="ul" />
<cfparam name="objectParams.maxDepth" default="5" />

<cf_objectconfigurator> <!--- cf_objectconfigurator adds default inputs --->
    <cfoutput>
        <div class="mura-control-group">
            <label>Title</label>
            <input  type="text" name="title" class="objectParam"
                value="#esapiEncode('html_attr', objectParams.title)#" />
        </div>
        <div class="mura-control-group">
            <label>List type</label>
            <select class="objectParam" name="listType">
                <option value="ul"<cfif objectParams.listType is 'ul'> selected</cfif>>Bulleted</option>
                <option value="ol"<cfif objectParams.listType is 'ol'> selected</cfif>>Ordered</option>
            </select>
        </div>
        <div class="mura-control-group">
            <label>Maximum depth</label>
            <select class="objectParam" name="maxDepth">
                <option value="2"<cfif objectParams.maxDepth is '2'> selected</cfif>>2</option>
                <option value="3"<cfif objectParams.maxDepth is '3'> selected</cfif>>3</option>
                <option value="4"<cfif objectParams.maxDepth is '4'> selected</cfif>>4</option>
                <option value="5"<cfif objectParams.maxDepth is '5'> selected</cfif>>5</option>
                <option value="6"<cfif objectParams.maxDepth is '6'> selected</cfif>>6</option>
            </select>
        </div>
    </cfoutput>
</cf_objectconfigurator>
