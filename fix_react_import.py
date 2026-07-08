path = "/Users/sama/Desktop/reactive-resume/src/routes/dashboard/admin/mixpanel.tsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if "import React" not in content and "import * as React" not in content:
    content = content.replace('import { useMemo, useState } from "react";', 'import React, { useMemo, useState } from "react";')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added React import")
else:
    print("React import already present")
