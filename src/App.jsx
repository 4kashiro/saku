import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Pencil, Eraser, MousePointer2, PaintBucket, RotateCw, Stamp, Plus, Trash2,
  Eye, EyeOff, Lock, Unlock, Copy, ChevronUp, ChevronDown, ChevronRight, ChevronLeft, Undo2, Redo2,
  ZoomIn, ZoomOut, FilePlus2, FolderOpen, Save, Image as ImageIcon, FileText,
  Printer, Palette, X, ArrowUpDown, Grid3x3, Layers as LayersIcon, Upload,
  Slash, Square, Pipette, HelpCircle
} from "lucide-react";
const customLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAPFBMVEVHcEz////+/f3+/v7+/v79/f3+/v7+/v7+/v7+/f7+/v7+/v7+/v7+/v7+/v7+/f38/Pz5+fn+/f7+/v7Os8qJAAAAEnRSTlMAAf4h7TJfa+P611ScQMKCEggcW/WdAAASHElEQVR42uydi7aiOgxAm6II+ADL///rVRSaJukDbPHMunZmnZeKdJsmaZK2Sv3ar/3ar/3ar/3ar/3ar/3ar/3ar/3ar/3ar/3ar/3ar7kNhuqfa8M9W+/hfOmaf651l3MmBEN/MEYntPlJ+Nn4x2fjrzD2WfjR9nmZ5e9Gm6S3xr+Yw2XI0f97r3dtbbYrGX3JIQPng9H/ajucMwjA7d/tv9a3z0Wg6szHkvi1ZprqYwDH5h+WAHM4/t8BXH8S8DEAxwi0ofZ6OOWZq9tkHKfvSc8uBOBSn2rczlNDf3g9fDo9/p/oU1/fanaB92PzdfAVz86VT69rn8hNzM+bXvh+xaUtA6B2HWSA6ZvzOyy/2yeir/JjgSeo91Wnx8nF/b+eywBo66mXc8eTm33y+yeF/6Kir0q4ovMxwC4Anp+KfWf0V+l2mdzMT3QfYL2eL8wvJ1wavUFpAFRsXx8k7oin+3jISPfu6Y+iF/OwXUbCbgDEmwwDWD8XZ1fzStdeQ0C8RwX7EIhdvACAJgYgdpcqfRR8DmC6/B8HgNRFgf4/L783AFh/l4BNx3YAi0H6ggS4PxHrkPIxqTQdwZ7CLk6vUhwAUDs+34aSGfht3kYdKXlFbhCrMADrCJHOoBuJWYF8xsHK034AQAV88h2zFdw32kUH0P6m9j8VE6whoCiAPfyAUh84yFov/WWwixVgn8Lx1F9Cre/Pg+cjruq+rytXqS7DbDiHr/u48vWO55f7mEGeN2qeOZxWjAJPkRxjDpdKHDPnrjWm7c6AACz9P14eTvgUC3rFg17f8H89XZjPlIrOBVjaYI6+tCir8w5KLV/H8VZxGYDri61prq5VmThXKB/xDonxHNKoL4MqDmBEAIS8UTCbZWYyPX/pMHfR3HgOD/q0HBk2TYWsgJUAIc90v6TEjB8f1bOPxGW9HuZEKg9ew5CYkGpvdwJA7Qog9T51c2Tj59TOqeS2Zor92CRGvrtKoTDR7gBSE2dmAgACgGmUnJhnkQygqciF9x0CQ7dGAlw36mTl+GMAsAuAOigB5lUBMVVBvL6gSgmDAMxxcgHAIssIAL4q+oUAwC5hbgA6DUB3E9qiyQ8SgNYDAOsAc5Cu27Uo/1sYQOOTgMlad/ZTHJx2f/wbjgsfLAFAJUCfhLedHaquGli726oNMgRgPwBAANTB4oKDBKAlAMABYJ0E7kNcZwCsAgD20wEvAFK4ZDbLy8PGBQBEAsyJTSvtyOsGIRB2PSAdsCMAoB69AADfp0cCXg86EgAkk2glwANgRwnQHgDqYwBaAPAWD2sFVgJQu0mA8gFQ9ksYQIvMILjBQkcCVGAICFVAxQDoVABq+ZIIgFkBBOA5i/gjAKTpMAFAM3fWSFAAj9usXQlwQsp25E1WgGbeAkqwsATEAShRB7QEgJIA4IjIAuAlATQcfsV+ACPwVQlQSUqQAyAfMZUAEgoPKEGlvigBLwVmTb1XAlwrwAE4EiCUknwFwHSbcQA4sMslAEWwa50oATz/nqoE9Q5WQEshUy8ALMrOEKDFMdgTFDKkXzODNKhBAaAP2RkC83QYm/ralhQKAJy5QKIjBGUBmAQdgKe7WAmOzVHR+qKTdgAoGcDiB2A3Qx4CNtxeTgekOULL/TAJEAHoEIBFApykiTwEoLwVUKS40T8XULIEgAcArYxzJEAJ02G/I1QOwEm5yXg+HeZ+ALoTmr5wJ0NEPNBc4F1G+6qqfZfc9q3ezQw2ZAgQAO5ccdZ+yusISRKg+eCyVkAH66G/AEDFAFg5QDogBsA/C3fWUqFU4Xc8QaxqSETo7BYAkxESGwJRAIGw+G6eIHGEfACQs+eXAIBAXmAFgG9IgJLsXDsDcOo1EnUABwAfAICyVkCBCMAtouMS0CQCgNU5t90BqDAASJQAnBobT7TsB+S0syELc/eNCXJjlQuAPrnZhsnVSROBXYOicVeY1mytB2DdjOutNf72JQlQiQBmBFJMMALAqoHh3Hvbpf2OBKwEsEUCFMmRyJVxX0mN6ToKgFRQr/UEARwzI9eZxyJCXx0CXgCiH9Ci3KA72w21r0aEUgDgYvKwHyAkRhIr6L+UGEmSAKcjfAgIAZGWWoF8AHR2PwAiQVG3eDukA/xKMF5+jmKCemc/wB8T1DUv3pZSY/ZGazvT5UVSqQDCSnDcMTPE0yabJSBaMf8tK5CQHfZOFUIA2rUASIkM/K36AHmqsE4C1DoA8HckAHxzJWYFghIQa+AFML3JbrPB8BBQa4Kifp9H1IgEgJs9Lh0QwbwHjxVgfOhkaKoQad0qMU//paWaFIC7xrxwXiB5CCjJCmAA1BUWey+KAAeAn14oLP7SAZDkCPklQAqKEgC+zTgcCdB+AFAQgL+HKwEEEyPxCUEQwF61wlElqEJWQKgUxeoTYlYgWQJgTwDeh00QwFozCGskALIpwQRHSG2TgI8BkJzsFz3B/SSAusL7AAgMAS07QjpBAqwnmLwM+SqsF9gLgBOzpAB8rnA4M7QagJIAME/QlIkJ4kqn+FxAp1SIbJkMae4KL2GIwkMAEkJiGyUgFgn7CoAmEBNEcwEOQK4RgmQAz6Xlp2oVAHfNkPmCI+TeS2AuEAcwpcba7hw2g2zdYNm5QIIEOH0UhkAiAJhf2hy5eyw5QuUCIuskAAd1sRlcqwOgn9Fd2K41sieIwmn19ypFncB+sE5QhStE7Nr6rkoDsFx5OHW6SF7gVc4YA+D4OmkhMUkC0OBZB+B+fuiOrACCe4isNoPo0WCRVNWgVwZ1gHNhmDbeCNeQFQbgiQo3q4qkYAFgRkELOlYAA6h6dxNgk2Fr7VQAmu8ytKZW2AcABf5xOI0AeOm+5+A3dION3TJD4n6T66vEAgDE5KjdmsId/NNL2/6eA8C4duGk8PCYUC7vTLRcAM78QwAA6n69kGMAjDn0g8otAVsBzPfpADCBDRRWAVDqSLv/+Phv1yxbXnmnw9uGgAr6AXZe65hBnnV1k6ND37GCwlud4+PfAEBtA+BsTO3Wlsg6wD481Gzwm+5UKVUGgNuJgS2a2pQaq9m6WjR4KuXsj0EB9Lz7TZ+t+4IOcD6OITE3aA6JS2bCABRbNKVbsuHUc+eya8797lZlh1U0OaoSJED5AbzXUSMAmum+810VAnDaDiAiAWzzBcEPcPYk9wDIqPtWR4XJEAAlrx6PS8CrkwyAb/l8ucG/CYBbJZU6BIS1wwuA9xAg6/EEAM/uHwtsdrm2UNIqK0jNC7hD4PXiI5EAN9p071t+nMjlWGSvT+4HQBKANUrQlQCylRYeAu8p/8Pt5brvelf7AEjKDNHV4226BIDrChMr8NzDVHJ7s+u+rUoQZADh1JikAzxmUB17eu7P0+8r1v10HaDJoqlYRIhWiDAA7mxnDhX2nZH8vnCJ/f5K0Lt/gDc7HLACFoDk9ZfSff7cYCKANfGAke8hIugAHvHQ48PtvSu1F4Cal674psMUQDQ3iNbcCn4ATKq/NZLbW7rRIin4bDocnAxZAEwCjhem+3RR3ecPigJsADBluOJ+AMoqYgCq6jve/afbu8O+9mTBBDhbQEubqEQBzEGfMABkBisW7dVFvP5EAJ/EBNExFKIjJM4j+2TVX+Sgg3UbKXmHQFpARIok8DM7J7dXLqFYrnC/1qc8BoJvpbVVB3jT462Qdax85zwGVf9ykeNztvCQkxKO0DYlGCuQoOVFnuXzD7e3Hvyqb1l8f5v8RbqpfY65wJrkaMQM1q0fgLx/wKP7Yd0HcnFBFgDmo+wwmwzhcvmWL8iTJCA54GPrVt7FBTlzg1FHiGSHxSTuS10RJajCErDG67fRlOLH7a2VAKyuXAAqCCAY7AbvPY85jt09hCx9coGENARCGym5AJ6qfwgeSyrfs/kCALlAok0DYJ+AT254dT+g++kbF5UAFQMASakxz0ZKFlBv3ElP0MtzzzlD91wCgNowBNp2bbn8bAaili94zwUkQG0B0C71ASpcIIEfP74qRUPdR7s3ClbAZNcB59BcwISXzbFDVmKlsgADqRUOqD/yvosZHPMDWLtqjJXypAKQ9fsf8AOUJ/PRCgGzvOXyGwAUsQJWXztxCx0+YWJDuXwGAEX8AA+A8BEbfL2A+hQAVNfz8b6/BKwAEFwxoiJWINaGvju0zaUK3nMpT3DePBSSl8+bzBsowHCZzJwRZvxQeC7gmODUDRQwAMgxBE7tOO0wKsz4oawErDCDeFvdYJmcWQ2ALicoKQGsWBqL8ubZYBBA3PrbkOGji2zk5ZWAxrN3tPLtLB0CoEQA40mY3qXeVQhAqXiAlMX2ANApK0bWD4FjRAJ0YSsQAqCSpsPZAEwS4Jy8W04CzmzDvPVBUfG8Qf0xALR62llbngXAyPeOBi8AV48F8gK5AByuCsgZHBZAIQkQS3nepdQeALkdIQGAeP5EXitwdk64lQFsyg1+AGAMAhgLmUHFNwyUAMAOADwSoAv7AT4J8C6e1sGocLt6C409JSBsBhuvHxDZUPGzPURsIWl5HRACAH4AtNyRmsFMErCYQXEIjKWUIJeAlhyzE9hVFlIl4F4dq3sMgCQBdm/+rAD0M/rgLedzAVAVsWUPkeulazpPjYMdAlwC1L1ui5hB/VqN4inodDZQ2H6+gG3nZjpoubumeYL2qMsjqiXPAADXqoxThjoqAYKfFN5DJFiGjc4ZsvgWAK0F8H4dLqbOERZ3zpc3Y9MP9lhd+XwB8Zyh1VFhexLZOWUIzHfrVtQ9Dyz9uPWkUOM9DhQ9Y6RG5wxaM5i0iYq0P409YaJ3V42BJAFvrcmqiTOUyDwLjtjalLnaMXDYWmxf4QgAe8SG6RWwbKA0HQa+frrLUSYGx5s2vlqdqjGyGSR82vAxO7UEoGUArCFlOkBcSdFdVY4GFbu0nmv1Kr69gpw8JgAgBgAkCcCH0ZGQWMVXUjwlNVPpKLBS9bc9kM8clXKDLgBgAMA7BHQQwFMCnispOrZ5Qt5S+sc76JGWKw8qOTVGo8Lk5GkGAB2zM/YQkYD7VVo+Pqi87TkOyAYdD8Z8OuwpIosdtUUDmwuA1vROjTkBYA7nI987wllGlKvxcfAYZacmtKpwxVlj7iZUgA9a6m1lkiQBt0YY/GXWEQw1tQfjodX/tXdFC46CMBD0el08qzX+/7+eVKtAglUrKkvmYd+6u0yTkEQzWeQCHzVFJ+mE/qdDgLu8xCAgC+v8H/wAsmxTDOgJUN6pMUkQIEkCDp6j6SoNRf/pMZDNX4MkAcTgpH0LoG2uNAFwwCCJ1PcB0AQIPwFGLWBMjCiPhIaGkQfIZQQA7DMgsOE+WBEDpo7JjIaIQ4DzSR8BKvwM4ViLDX4AOxGg5mIAJqD7vaVaM0iyvx80fwtkBCsIkDYBQBAgiRjwJkDnfdT8tBTHMaD9oIXlLmDFgOEssxbgd4G+5lU48Tnw/CgvAk9fj+oILSOg8VgAqRkWen7aXx8YfkA2brZbAEmAoMUTHo04CXk9CY7+3FbEAIeAbC4PUPWYROO6PKh2xJJg+K7DAMpmDQHesTmvBbz6fWYSBsG1I5b5wb14da/pCT2iI2TcAuTYHG0BegFnYM2wL/ygKirPfzLvAioj9GrHW6A1GyLyUV0m9rluIOUz99khKaFBBEHj7RKcB9zf7U51Ut73kYEZ67CqQesTywmo87LPveGkvO8b9zBdwM2lCEFFigBVjLctHKsdEYwAuYoAd3x+0xjVxQjoj2rvGHG2JNC7xwfJNCGiI4B6Suk8GbJ3BHiWr18l9C8umQqsEI4JUIpYtUUSEEvsW0kANTxNWMAwQRsnAYNEutXYmiFA5lgwD6IJ/b5EaLkF5HVhZz2XSXv3DII+C5C66DlGLfPURIiyAClOUowL10MvWu+qB4meDUqPYlz1aESkGGM5XvVgqcsPtQDud3W+E9fN52J4ZxNwy9SR16f7Xa2K+/jazv9Aq1cdEMeYCHg1VIl+V3ZwszuIEzzKqiqpr9GOAVgxTh//GMG80BQ8n7QVGz3BGr/iElPNt9U7Jgv4Id7xuInfjrt54F9y8W8lAIlGNUIkSkA6x+8JQIppqkrl+JQF7L8f49q3AFANj1SOjyygO36EDY+v8E+htC8tvJsFkLUpHl8HgS79hSSyXg+etS4VsxSyXm+pWJdlfZMiXcgm5dMzGAwGg8FgMBgMBoPBYDAYDMbh+A+FCV0Un9DY9gAAAABJRU5ErkJggg==";

/* ---------------------------------- data ------------------------------------ */
const APP_THEMES = {
  "Sahabat Purple": {
    chrome: "#2C1B4D", panel: "#3A2266", panelAlt: "#462C7D", line: "#5C3A94", 
    gold: "#FF70BF", goldSoft: "rgba(255,112,191,0.16)", teal: "#D552A3", tealSoft: "rgba(213,82,163,0.22)", 
    text: "#F6EEFA", muted: "#C6AEE0", danger: "#FF6B6B"
  },
  "Dark Classic": {
    chrome: "#121212", panel: "#1E1E1E", panelAlt: "#2C2C2C", line: "#3D3D3D", 
    gold: "#E3C16F", goldSoft: "rgba(227,193,111,0.16)", teal: "#6F9CE3", tealSoft: "rgba(111,156,227,0.22)", 
    text: "#E0E0E0", muted: "#A0A0A0", danger: "#FF5252"
  },
  "Light Mode": {
    chrome: "#F5F5F7", panel: "#FFFFFF", panelAlt: "#F0F0F0", line: "#E0E0E0", 
    gold: "#007AFF", goldSoft: "rgba(0,122,255,0.12)", teal: "#34C759", tealSoft: "rgba(52,199,89,0.22)", 
    text: "#1D1D1F", muted: "#86868B", danger: "#FF3B30"
  },
  "Kufi Green": {
    chrome: "#0F2922", panel: "#153A30", panelAlt: "#1B4D40", line: "#2A6E5C", 
    gold: "#F39C12", goldSoft: "rgba(243,156,18,0.16)", teal: "#1ABC9C", tealSoft: "rgba(26,188,156,0.22)", 
    text: "#E8F5E9", muted: "#A5D6A7", danger: "#E74C3C"
  }
};

const STAMP_SHAPES = {
  "allah": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [0, 2], [1, 2], [2, 2], [4, 2], [6, 2], [2, 3], [4, 3], [6, 3], [0, 4], [1, 4], [2, 4], [4, 4], [6, 4], [0, 5], [2, 5], [4, 5], [6, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]],
  "muhammad": [[0, 0], [2, 0], [4, 0], [5, 0], [6, 0], [0, 1], [2, 1], [4, 1], [6, 1], [0, 2], [1, 2], [2, 2], [4, 2], [5, 2], [6, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [4, 4], [5, 4], [6, 4], [0, 5], [2, 5], [6, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]],
  "alif": [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
  "ba": [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
  "ba-5": [[0, 0], [1, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "ba-7": [[0, 0], [1, 0], [2, 0], [4, 0], [5, 0], [6, 0], [0, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
  "ta": [[0, 0], [2, 0], [4, 0], [6, 0], [0, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
  "tsa": [[0, 0], [2, 0], [4, 0], [6, 0], [8, 0], [0, 1], [8, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
  "jim": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [2, 4], [4, 4], [0, 5], [4, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6]],
  "jim-5": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [0, 2], [1, 2], [2, 2], [4, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "ha": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "dal": [[0, 0], [1, 0], [2, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  "dal-5": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2], [2, 3], [0, 4], [1, 4], [2, 4]],
  "ra": [[4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "sin": [[0, 0], [2, 0], [4, 0], [6, 0], [0, 1], [2, 1], [4, 1], [6, 1], [0, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "shad": [[0, 0], [2, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 1], [2, 1], [4, 1], [8, 1], [0, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "tha": [[2, 0], [2, 1], [2, 2], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [2, 4], [6, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]],
  "tha-5": [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "ain": [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [2, 2], [0, 3], [0, 4], [1, 4], [2, 4]],
  "ain-7": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2], [0, 3], [0, 4], [1, 4], [2, 4], [0, 5], [0, 6], [1, 6], [2, 6]],
  "fa": [[0, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [4, 1], [0, 2], [2, 2], [3, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "kaf": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "rumahkaf": [[4, 0], [4, 1], [4, 2], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "rumahkaf-7": [[6, 0], [6, 1], [0, 2], [6, 2], [0, 3], [6, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4]],
  "lam": [[2, 0], [2, 1], [0, 2], [2, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "lam-5": [[4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "mim": [[2, 0], [3, 0], [4, 0], [2, 1], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
  "mim-5": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [4, 1], [0, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "nun": [[0, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "nun-5": [[0, 0], [1, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [2, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "wau": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [2, 3], [0, 4], [1, 4], [2, 4]],
  "waw-7": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [2, 3], [0, 4], [2, 4], [0, 5], [2, 5], [0, 6], [1, 6], [2, 6]],
  "hha": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
  "hha-5": [[0, 0], [1, 0], [2, 0], [2, 1], [0, 2], [1, 2], [2, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "hha-7": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2], [2, 3], [0, 4], [1, 4], [2, 4], [0, 5], [2, 5], [0, 6], [1, 6], [2, 6]],
  "lamalif": [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [1, 3], [0, 4], [1, 4], [2, 4], [0, 5], [2, 5], [0, 6], [1, 6], [2, 6]],
  "lamalif-5": [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "hamzah": [[2, 0], [3, 0], [4, 0], [2, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "hamzah-5": [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
  "ya": [[0, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [0, 2], [2, 2], [3, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "ya-7": [[0, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [4, 1], [0, 2], [2, 2], [4, 2], [0, 3], [2, 3], [0, 4], [2, 4], [3, 4], [4, 4], [0, 5], [4, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6]],
};
const STAMP_LABELS = {
  "allah": "Allah", "muhammad": "Muhammad", "alif": "Alif", "ba": "Ba", "ba-5": "Ba-5", "ba-7": "Ba-7",
  "ta": "Ta", "tsa": "Tsa", "jim": "Jim", "jim-5": "Jim-5", "ha": "Ha", "dal": "Dal", "dal-5": "Dal-5",
  "ra": "Ra", "sin": "Sin", "shad": "Shad", "tha": "Tha", "tha-5": "Tha-5", "ain": "Ain", "ain-7": "Ain-7",
  "fa": "Fa", "kaf": "Kaf", "rumahkaf": "RumahKaf", "rumahkaf-7": "RumahKaf-7", "lam": "Lam", "lam-5": "Lam-5",
  "mim": "Mim", "mim-5": "Mim-5", "nun": "Nun", "nun-5": "Nun-5", "wau": "Wau", "waw-7": "Waw-7",
  "hha": "Hha", "hha-5": "Hha-5", "hha-7": "Hha-7", "lamalif": "Lamalif", "lamalif-5": "Lamalif-5",
  "hamzah": "Hamzah", "hamzah-5": "Hamzah-5", "ya": "Ya", "ya-7": "Ya-7",
};
const KUFI_STAMP_IDS = ["allah", "muhammad"];
const HURUF_STAMP_IDS = [
  "alif", "ba", "ba-5", "ba-7", "ta", "tsa", "jim", "jim-5", 
  "ha", "dal", "dal-5", "ra", "sin", "shad", "tha", "tha-5", "ain", "ain-7", "fa", 
  "kaf", "rumahkaf", "rumahkaf-7", "lam", "lam-5", "mim", "mim-5", "nun", "nun-5", 
  "wau", "waw-7", "hha", "hha-5", "hha-7", "lamalif", "lamalif-5", "hamzah", "hamzah-5", 
  "ya", "ya-7"
];

function generateStampObjects(ids) {
  return ids.map((id) => {
    const cells = STAMP_SHAPES[id];
    const maxX = Math.max(...cells.map(coord => coord[0]));
    const maxY = Math.max(...cells.map(coord => coord[1]));
    return { id, kind: "cells", w: maxX + 1, h: maxY + 1, cells: cells, label: STAMP_LABELS[id], builtin: true };
  });
}
const BUILTIN_STAMPS_KUFI = generateStampObjects(KUFI_STAMP_IDS);
const BUILTIN_STAMPS_HURUF = generateStampObjects(HURUF_STAMP_IDS);
const ALL_BUILTIN = [...BUILTIN_STAMPS_KUFI, ...BUILTIN_STAMPS_HURUF];
const MAX_STAMP = 64; 

function rotSteps(rotation) { return (((rotation / 90) % 4) + 4) % 4; }
function rotatedDims(w, h, steps) { return steps % 2 === 1 ? { w: h, h: w } : { w, h }; }
function getEffectiveFootprint(st) { return rotatedDims(st.footprintW, st.footprintH, rotSteps(st.rotation)); }

function parseStampCSV(csv) {
  if (!csv || !csv.trim()) return null;
  const rows = csv.trim().split(";").map((r) => r.trim()).filter((r) => r.length > 0);
  if (rows.length === 0) return null;
  const h = Math.min(MAX_STAMP, rows.length);
  const w = Math.min(MAX_STAMP, Math.max(...rows.map((r) => r.length)));
  const cells = [];
  for (let y = 0; y < h; y++) {
    const row = rows[y] || "";
    for (let x = 0; x < w; x++) if (row[x] === "1") cells.push([x, y]);
  }
  return { w, h, cells };
}

function drawStampOnCtx(ctx, st, cellPx, imageCacheRef, onImageReady, alpha) {
  const prevAlpha = ctx.globalAlpha;
  if (alpha !== undefined) ctx.globalAlpha = prevAlpha * alpha;
  const { w: effW, h: effH } = getEffectiveFootprint(st);
  const cx = (st.gx + effW / 2) * cellPx;
  const cy = (st.gy + effH / 2) * cellPx;
  const boxW = st.footprintW * cellPx;
  const boxH = st.footprintH * cellPx;

  if (st.type === "image") {
    let img = imageCacheRef.current[st.imageSrc];
    if (!img) {
      img = new Image();
      img.onload = () => onImageReady && onImageReady();
      img.src = st.imageSrc;
      imageCacheRef.current[st.imageSrc] = img;
    }
    if (img.complete && img.naturalWidth > 0) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((st.rotation * Math.PI) / 180);
      ctx.drawImage(img, -boxW / 2, -boxH / 2, boxW, boxH);
      ctx.restore();
    }
  } else {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((st.rotation * Math.PI) / 180);
    ctx.fillStyle = st.color;
    const subW = boxW / st.patternW;
    const subH = boxH / st.patternH;
    st.cells.forEach(([px, py]) => {
      ctx.fillRect(-boxW / 2 + px * subW, -boxH / 2 + py * subH, subW, subH);
    });
    ctx.restore();
  }
  ctx.globalAlpha = prevAlpha;
}

const PALETTES = {
  "Sahabat Purple": ["#462C7D", "#831C91", "#D552A3", "#FF70BF"],
  "Kufi Klasik": ["#1A1A1A", "#F4ECD8", "#C9A227", "#8B5E34"],
  "Gurun Pasir": ["#D2B48C", "#E3C16F", "#B8860B", "#8B4513", "#D9E3CC"],
  "Kufi Emas": ["#FFD700", "#DAA520", "#B8860B", "#F5DEB3", "#FFF8DC"],
  "Peaceful Night": ["#000B18", "#0B1D3A", "#1D3A5F", "#407088", "#EAB543"],
  "Senja Manado": ["#FF7E67", "#FF4C4C", "#C0392B", "#8E44AD", "#FAD390"],
  "Kopi Hitam": ["#2C1E16", "#3E2723", "#4E342E", "#5D4037", "#D7CCC8"],
  "Monokrom": ["#000000", "#404040", "#808080", "#BFBFBF", "#FFFFFF"],
  "Pastel Sakura": ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],
  "Neon Cyber": ["#FCEE09", "#00FFF5", "#FF007F", "#111111", "#7B00FF"],
  "Forest": ["#2C5F2D", "#97BC62", "#113014", "#D8E2DC"],
  "Ocean": ["#00B4DB", "#0083B0", "#E0EAFC", "#CFDEF3"],
  "Sunset": ["#FF6B6B", "#FF8E53", "#FFD166", "#EF476F", "#8338EC"],
  "Royal": ["#1A1A2E", "#16213E", "#0F3460", "#533483", "#E94560"],
  "Desert": ["#C1666B", "#E3A857", "#F4D35E", "#EE964B", "#6B4226"],
  "Lavender": ["#6C5CE7", "#A29BFE", "#C8B6FF", "#E2D9F3", "#F8F7FF"],
  "Mint": ["#004D40", "#00796B", "#26A69A", "#80CBC4", "#E0F2F1"],
  "Cherry": ["#5C001E", "#8B0000", "#C9184A", "#FF4D6D", "#FFCCD5"],
  "Golden": ["#3D2B00", "#8C6A00", "#C9A227", "#E5C76B", "#FFF3B0"],
  "Arctic": ["#023047", "#219EBC", "#8ECAE6", "#CAF0F8", "#F8FDFF"],
  "Tropical": ["#006D77", "#83C5BE", "#FFDDD2", "#E29578", "#FFB703"]
};
const GRID_PRESETS = [
  { label: "16×16", cols: 16, rows: 16 },
  { label: "32×32", cols: 32, rows: 32 },
  { label: "64×64", cols: 64, rows: 64 },
];
const ZOOM_STEPS = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4, 5];

function uid() { return Math.random().toString(36).slice(2, 10); }
function makeLayer(name) { return { id: uid(), name, visible: true, locked: false, opacity: 1, cells: {}, stamps: [] }; }
function deepClone(o) { return JSON.parse(JSON.stringify(o)); }

/* --------------------------------- component --------------------------------- */
export default function SahabatKuApp() {
  // STATE: Tema UI
  const [appThemeName, setAppThemeName] = useState("Sahabat Purple");
  const C = APP_THEMES[appThemeName] || APP_THEMES["Sahabat Purple"];

  const [gridCols, setGridCols] = useState(32);
  const [gridRows, setGridRows] = useState(32);
  const [showGrid, setShowGrid] = useState(true);
  const [showAltShading, setShowAltShading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [exportScale, setExportScale] = useState(16);

  const [project, setProject] = useState(() => {
    const l = makeLayer("Layer 1");
    return { layers: [l], activeLayerId: l.id };
  });

  const [activeTool, setActiveTool] = useState("pencil");
  const [rectFilled, setRectFilled] = useState(false);
  const [activeColor, setActiveColor] = useState(C.gold);
  const [pickerColor, setPickerColor] = useState(C.gold);
  const [customPalette, setCustomPalette] = useState([]);
  const [recentColors, setRecentColors] = useState([]);
  const [activePaletteName, setActivePaletteName] = useState("Sahabat Purple");
  
  const [activeTool, setActiveTool] = useState("pencil");
  const [brushSize, setBrushSize] = useState(1); // <--- Tambahkan baris ini
  const [rectFilled, setRectFilled] = useState(false);
  const [selection, setSelection] = useState(null);
  const [selectedStampId, setSelectedStampId] = useState(null);
  const [hoverCell, setHoverCell] = useState(null);

  const [stampChoiceId, setStampChoiceId] = useState("allah");
  const [nextStampRotation, setNextStampRotation] = useState(0);
  const [nextFootprintW, setNextFootprintW] = useState(3);
  const [nextFootprintH, setNextFootprintH] = useState(3);
  const [customCsvStamps, setCustomCsvStamps] = useState([]); 
  const [customImageStamps, setCustomImageStamps] = useState([]); 
  const [csvText, setCsvText] = useState("");
  const [csvName, setCsvName] = useState("");
  const [showCsvForm, setShowCsvForm] = useState(false);
  const [stampCats, setStampCats] = useState({ kufi: false, huruf: false, custom: false });

  const stampLibrary = [...ALL_BUILTIN, ...customCsvStamps, ...customImageStamps];
  const chosenStamp = stampLibrary.find((s) => s.id === stampChoiceId) || ALL_BUILTIN[0];

  useEffect(() => {
    if (chosenStamp.kind === "cells") {
      setNextFootprintW(chosenStamp.w);
      setNextFootprintH(chosenStamp.h);
    }
  }, [stampChoiceId]);

  const [customW, setCustomW] = useState(32);
  const [customH, setCustomH] = useState(32);
  const [gridSizeLabel, setGridSizeLabel] = useState("32×32");

  const [isDrawing, setIsDrawing] = useState(false);
  const [movingSelection, setMovingSelection] = useState(false);
  const [draggingStamp, setDraggingStamp] = useState(false);
  const [, forceTick] = useState(0);
  
  const [sidebarExpanded, setSidebarExpanded] = useState(window.innerWidth > 768);
  const [showAbout, setShowAbout] = useState(false); // Modal About
  const [showExportScale, setShowExportScale] = useState(false);
  const [exportScalePos, setExportScalePos] = useState({ top: 0, left: 0 });
  const exportScaleBtnRef = useRef(null);
  function toggleExportScale() {
    if (!showExportScale && exportScaleBtnRef.current) {
      const r = exportScaleBtnRef.current.getBoundingClientRect();
      setExportScalePos({ top: r.bottom + 6, left: r.left });
    }
    setShowExportScale((s) => !s);
  }

  const [panels, setPanels] = useState({
    theme: { open: true, collapsed: false },
    grid: { open: true, collapsed: false },
    color: { open: true, collapsed: false },
    stamp: { open: true, collapsed: false },
    layer: { open: true, collapsed: false },
  });

  const pinchStartDistRef = useRef(null);
  const pinchStartZoomRef = useRef(null);
  const pinchStartCenterRef = useRef(null);
  const pinchStartScrollRef = useRef(null);
  const canvasScrollRef = useRef(null);

  function togglePanelCollapsed(key) { setPanels((p) => ({ ...p, [key]: { ...p[key], collapsed: !p[key].collapsed } })); }
  function toggleSidebar() { setSidebarExpanded(!sidebarExpanded); }
  function openPanel(key) {
    if(!sidebarExpanded) setSidebarExpanded(true);
    setPanels((p) => ({ ...p, [key]: { open: true, collapsed: false } }));
  }
  function closePanel(key) { setPanels((p) => ({ ...p, [key]: { ...p[key], open: false } })); }

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const stampUploadRef = useRef(null);
  const draftRef = useRef(null);
  const movingBlockRef = useRef(null);
  const moveBaselineRef = useRef(null);
  const shapeStartRef = useRef(null);
  const shapeBaselineRef = useRef(null);
  const moveAnchorRef = useRef(null);
  const moveDimRef = useRef(null);
  const moveStartGridRef = useRef(null);
  const stampDragAnchorRef = useRef(null);
  const stampOrigRef = useRef(null);
  const lastPaintRef = useRef(null);
  const imageCacheRef = useRef({});
  const drawCanvasRef = useRef(null);
  const historyRef = useRef([deepClone(project)]);
  const historyIndexRef = useRef(0);
  const activePointersRef = useRef(new Map());
  const sessionAbortedRef = useRef(false); // <--- Tambahkan baris ini

  /* --------------------------- history --------------------------- */
  function pushHistory(nextProject) {
    const snap = deepClone(nextProject);
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    historyRef.current.push(snap);
    historyIndexRef.current = historyRef.current.length - 1;
    forceTick((t) => t + 1);
  }
  function undo() {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    setProject(deepClone(historyRef.current[historyIndexRef.current]));
    setSelection(null); setSelectedStampId(null); forceTick((t) => t + 1);
  }
  function redo() {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    setProject(deepClone(historyRef.current[historyIndexRef.current]));
    forceTick((t) => t + 1);
  }
  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;
  function commit(nextProject) { setProject(nextProject); pushHistory(nextProject); }

  /* --------------------------- helpers --------------------------- */
  const activeLayer = project.layers.find((l) => l.id === project.activeLayerId);
  const displayLayers = [...project.layers].reverse();

  function addRecentColor(color) { setRecentColors((prev) => [color, ...prev.filter((c) => c !== color)].slice(0, 8)); }
  function pickColor(color) {
    setActiveColor(color); addRecentColor(color);
    if (selectedStampId) updateStampColor(selectedStampId, color);
  }
  function getCellPx() { return Math.max(6, Math.min(28, Math.floor(500 / Math.max(gridCols, gridRows)))) * zoom; }
  function getGridCoords(e) {
    const canvas = canvasRef.current, rect = canvas.getBoundingClientRect();
    const cellPx = getCellPx(), scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height;
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const x = (clientX - rect.left) * scaleX, y = (clientY - rect.top) * scaleY;
    return { gx: Math.max(0, Math.min(gridCols - 1, Math.floor(x / cellPx))), gy: Math.max(0, Math.min(gridRows - 1, Math.floor(y / cellPx))) };
  }

  /* --------------------------- canvas render --------------------------- */
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const cellPx = getCellPx(); canvas.width = gridCols * cellPx; canvas.height = gridRows * cellPx;
    const ctx = canvas.getContext("2d"); ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background
    ctx.fillStyle = C.chrome === "#121212" ? "#1A1A1A" : "#F4F2EC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showAltShading) {
      ctx.fillStyle = C.chrome === "#121212" ? "rgba(255,255,255,0.03)" : "rgba(90,50,140,0.09)";
      for (let y = 0; y < gridRows; y++) for (let x = 0; x < gridCols; x++) if (x % 2 === 1 && y % 2 === 1) ctx.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
    }

    project.layers.forEach((layer) => {
      if (!layer.visible) return; ctx.globalAlpha = layer.opacity;
      Object.entries(layer.cells).forEach(([key, color]) => { const [x, y] = key.split(",").map(Number); ctx.fillStyle = color; ctx.fillRect(x * cellPx, y * cellPx, cellPx, cellPx); });
      layer.stamps.forEach((st) => drawStampOnCtx(ctx, st, cellPx, imageCacheRef, () => drawCanvasRef.current && drawCanvasRef.current()));
    });
    ctx.globalAlpha = 1;

    if (showGrid) {
      ctx.strokeStyle = C.chrome === "#121212" ? "rgba(255,255,255,0.1)" : "rgba(20,20,30,0.38)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= gridCols; x++) { ctx.beginPath(); ctx.moveTo(x * cellPx + 0.5, 0); ctx.lineTo(x * cellPx + 0.5, gridRows * cellPx); ctx.stroke(); }
      for (let y = 0; y <= gridRows; y++) { ctx.beginPath(); ctx.moveTo(0, y * cellPx + 0.5); ctx.lineTo(gridCols * cellPx, y * cellPx + 0.5); ctx.stroke(); }
    }

    if (selection) {
      const sx = Math.min(selection.x0, selection.x1), sy = Math.min(selection.y0, selection.y1);
      const ex = Math.max(selection.x0, selection.x1), ey = Math.max(selection.y0, selection.y1);
      ctx.fillStyle = C.tealSoft; ctx.fillRect(sx * cellPx, sy * cellPx, (ex - sx + 1) * cellPx, (ey - sy + 1) * cellPx);
      ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.strokeRect(sx * cellPx + 1, sy * cellPx + 1, (ex - sx + 1) * cellPx - 2, (ey - sy + 1) * cellPx - 2); ctx.setLineDash([]);
    }
    if (selectedStampId) {
      const st = project.layers.find((l) => l.id === project.activeLayerId)?.stamps.find((s) => s.id === selectedStampId);
      if (st) { const { w, h } = getEffectiveFootprint(st); ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.strokeRect(st.gx * cellPx + 1, st.gy * cellPx + 1, w * cellPx - 2, h * cellPx - 2); }
    }

    if (activeTool === "stamp" && hoverCell && !draggingStamp && !isDrawing) {
      const { w: effW, h: effH } = rotatedDims(nextFootprintW, nextFootprintH, rotSteps(nextStampRotation));
      const ggx = Math.max(0, Math.min(hoverCell.gx, Math.max(0, gridCols - effW))), ggy = Math.max(0, Math.min(hoverCell.gy, Math.max(0, gridRows - effH)));
      const ghost = chosenStamp.kind === "image" ? { type: "image", imageSrc: chosenStamp.dataUrl, gx: ggx, gy: ggy, rotation: nextStampRotation, footprintW: nextFootprintW, footprintH: nextFootprintH } : { type: "cells", cells: chosenStamp.cells, patternW: chosenStamp.w, patternH: chosenStamp.h, gx: ggx, gy: ggy, rotation: nextStampRotation, footprintW: nextFootprintW, footprintH: nextFootprintH, color: activeColor };
      drawStampOnCtx(ctx, ghost, cellPx, imageCacheRef, undefined, 0.4);
      ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.strokeRect(ggx * cellPx + 1, ggy * cellPx + 1, effW * cellPx - 2, effH * cellPx - 2); ctx.setLineDash([]);
    }
  }, [project, gridCols, gridRows, showGrid, showAltShading, zoom, selection, selectedStampId, activeTool, hoverCell, chosenStamp, nextStampRotation, nextFootprintW, nextFootprintH, activeColor, draggingStamp, isDrawing, C]);

  useEffect(() => { drawCanvasRef.current = drawCanvas; }, [drawCanvas]);
  useEffect(() => { drawCanvas(); }, [drawCanvas]);

  /* --------------------------- pixel-cell painting --------------------------- */
  function beginStroke() { draftRef.current = deepClone(project); }
  function bresenhamLine(x0, y0, x1, y1) {
    const points = []; let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0); let sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy, x = x0, y = y0;
    while (true) { points.push([x, y]); if (x === x1 && y === y1) break; const e2 = 2 * err; if (e2 > -dy) { err -= dy; x += sx; } if (e2 < dx) { err += dx; y += sy; } }
    return points;
  }
  function paintLineLive(from, to, color) {
    const next = draftRef.current, layer = next.layers.find((l) => l.id === next.activeLayerId);
    bresenhamLine(from.gx, from.gy, to.gx, to.gy).forEach(([cx, cy]) => {
      // Loop untuk membuat kuas lebih tebal
      const offset = Math.floor(brushSize / 2);
      for (let i = 0; i < brushSize; i++) {
        for (let j = 0; j < brushSize; j++) {
          const px = cx - offset + i;
          const py = cy - offset + j;
          // Pastikan tidak keluar dari batas kanvas
          if (px >= 0 && px < gridCols && py >= 0 && py < gridRows) {
            if (color === null) delete layer.cells[`${px},${py}`];
            else layer.cells[`${px},${py}`] = color;
          }
        }
      }
    });
    setProject({ ...next });
  }
  
  function eraseLineLive(from, to) {
    const next = draftRef.current, layer = next.layers.find((l) => l.id === next.activeLayerId);
    const pts = bresenhamLine(from.gx, from.gy, to.gx, to.gy);
    
    pts.forEach(([cx, cy]) => {
      const offset = Math.floor(brushSize / 2);
      for (let i = 0; i < brushSize; i++) {
        for (let j = 0; j < brushSize; j++) {
          const px = cx - offset + i;
          const py = cy - offset + j;
          delete layer.cells[`${px},${py}`];
        }
      }
    });
    
    layer.stamps = layer.stamps.filter((st) => !pts.some(([cx, cy]) => {
        // Logika penghapusan stempel yang bersinggungan dengan kuas
        const offset = Math.floor(brushSize / 2);
        for(let i=0; i<brushSize; i++) {
            for(let j=0; j<brushSize; j++) {
                const px = cx - offset + i;
                const py = cy - offset + j;
                if (px >= st.gx && px <= st.gx + getEffectiveFootprint(st).w - 1 && py >= st.gy && py <= st.gy + getEffectiveFootprint(st).h - 1) return true;
            }
        }
        return false;
    }));
    setProject({ ...next });
  }
  function bucketFill(gx, gy, fillColor) {
    const next = deepClone(project), layer = next.layers.find((l) => l.id === next.activeLayerId), target = layer.cells[`${gx},${gy}`] ?? null;
    if (target === fillColor) return;
    const stack = [[gx, gy]], visited = new Set();
    while (stack.length) {
      const [x, y] = stack.pop(); if (x < 0 || y < 0 || x >= gridCols || y >= gridRows) continue;
      const key = `${x},${y}`; if (visited.has(key)) continue; visited.add(key);
      if ((layer.cells[key] ?? null) !== target) continue;
      layer.cells[key] = fillColor; stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    commit(next); addRecentColor(fillColor);
  }

  /* --------------------------- selection --------------------------- */
  function updateMovePreview(newX0, newY0) {
    const next = deepClone(moveBaselineRef.current), layer = next.layers.find((l) => l.id === next.activeLayerId);
    Object.entries(movingBlockRef.current).forEach(([relKey, color]) => { const [rx, ry] = relKey.split(",").map(Number); layer.cells[`${newX0 + rx},${newY0 + ry}`] = color; });
    setProject(next); draftRef.current = next; setSelection({ x0: newX0, y0: newY0, x1: newX0 + moveDimRef.current.w - 1, y1: newY0 + moveDimRef.current.h - 1 });
  }
  function rotateSelection() {
    if (!selection || !activeLayer) return;
    const next = deepClone(project), layer = next.layers.find((l) => l.id === next.activeLayerId);
    const x0 = Math.min(selection.x0, selection.x1), y0 = Math.min(selection.y0, selection.y1);
    const w = Math.max(selection.x0, selection.x1) - x0 + 1, h = Math.max(selection.y0, selection.y1) - y0 + 1;
    const nx0 = Math.min(x0, Math.max(0, gridCols - h)), ny0 = Math.min(y0, Math.max(0, gridRows - w));
    const oldBlock = {};
    for (let x = x0; x < x0 + w; x++) for (let y = y0; y < y0 + h; y++) { const k = `${x},${y}`; if (layer.cells[k] !== undefined) { oldBlock[`${x - x0},${y - y0}`] = layer.cells[k]; delete layer.cells[k]; } }
    Object.entries(oldBlock).forEach(([relKey, color]) => { const [lx, ly] = relKey.split(",").map(Number); layer.cells[`${nx0 + (h - 1 - ly)},${ny0 + lx}`] = color; });
    commit(next); setSelection({ x0: nx0, y0: ny0, x1: nx0 + h - 1, y1: ny0 + w - 1 });
  }
  function deleteSelection() {
    if (!selection) return;
    const next = deepClone(project), layer = next.layers.find((l) => l.id === next.activeLayerId);
    const x0 = Math.min(selection.x0, selection.x1), y0 = Math.min(selection.y0, selection.y1);
    for (let x = x0; x <= Math.max(selection.x0, selection.x1); x++) for (let y = y0; y <= Math.max(selection.y0, selection.y1); y++) delete layer.cells[`${x},${y}`];
    commit(next); setSelection(null);
  }

  /* --------------------------- stamps --------------------------- */
  function placeStamp(gx, gy) {
    if (!activeLayer || activeLayer.locked || !chosenStamp) return;
    const footprintW = Math.max(1, nextFootprintW), footprintH = Math.max(1, nextFootprintH);
    const { w: effW, h: effH } = rotatedDims(footprintW, footprintH, rotSteps(nextStampRotation));
    const cgx = Math.max(0, Math.min(gx, Math.max(0, gridCols - effW))), cgy = Math.max(0, Math.min(gy, Math.max(0, gridRows - effH)));
    const stamp = chosenStamp.kind === "image" ? { id: uid(), type: "image", imageSrc: chosenStamp.dataUrl, gx: cgx, gy: cgy, rotation: nextStampRotation, footprintW, footprintH } : { id: uid(), type: "cells", cells: chosenStamp.cells, patternW: chosenStamp.w, patternH: chosenStamp.h, gx: cgx, gy: cgy, rotation: nextStampRotation, footprintW, footprintH, color: activeColor };
    const next = deepClone(project); next.layers.find((l) => l.id === next.activeLayerId).stamps.push(stamp);
    commit(next); if (stamp.type === "cells") addRecentColor(activeColor); setSelectedStampId(stamp.id);
  }
  function findStampAt(gx, gy) {
    if (!activeLayer) return null;
    for (let i = activeLayer.stamps.length - 1; i >= 0; i--) {
      const st = activeLayer.stamps[i], { w, h } = getEffectiveFootprint(st);
      if (gx >= st.gx && gx <= st.gx + w - 1 && gy >= st.gy && gy <= st.gy + h - 1) return st;
    }
    return null;
  }
  function rotateSelectedStamp() {
    if (!selectedStampId) return;
    const next = deepClone(project), st = next.layers.find((l) => l.id === next.activeLayerId).stamps.find((s) => s.id === selectedStampId);
    if (!st) return; st.rotation = (st.rotation + 90) % 360; commit(next);
  }
  function deleteSelectedStamp() {
    if (!selectedStampId) return;
    const next = deepClone(project), layer = next.layers.find((l) => l.id === next.activeLayerId);
    layer.stamps = layer.stamps.filter((s) => s.id !== selectedStampId); commit(next); setSelectedStampId(null);
  }
  function updateStampColor(id, color) {
    const next = deepClone(project), st = next.layers.find((l) => l.id === next.activeLayerId).stamps.find((s) => s.id === id);
    if (!st || st.type === "image") return; st.color = color; commit(next);
  }
  function handleUploadStamp(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const entry = { id: uid(), kind: "image", name: file.name.replace(/\.[^.]+$/, ""), label: file.name.replace(/\.[^.]+$/, ""), dataUrl: ev.target.result };
      setCustomImageStamps((prev) => [...prev, entry]); setStampChoiceId(entry.id); setActiveTool("stamp");
      setStampCats(c => ({...c, custom: true}));
    };
    reader.readAsDataURL(file); e.target.value = "";
  }
  function handleAddCsvStamp() {
    const parsed = parseStampCSV(csvText);
    if (!parsed || parsed.cells.length === 0) return window.alert(`Format CSV tidak valid.`);
    const entry = { id: uid(), kind: "cells", w: parsed.w, h: parsed.h, cells: parsed.cells, label: csvName.trim() || "Stempel CSV" };
    setCustomCsvStamps((prev) => [...prev, entry]); setStampChoiceId(entry.id); setActiveTool("stamp");
    setCsvText(""); setCsvName(""); setShowCsvForm(false); setStampCats(c => ({...c, custom: true}));
  }
  function rotateActive() { if (selection) rotateSelection(); else if (selectedStampId) rotateSelectedStamp(); }
  function deleteActive() { if (selection) deleteSelection(); else if (selectedStampId) deleteSelectedStamp(); }

  /* --------------------------- pointer handlers --------------------------- */
  function handlePointerDown(e) {
    // SIMPAN HANYA KOORDINAT, BUKAN OBJEK EVENT
    activePointersRef.current.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

    if (activePointersRef.current.size === 2) {
      sessionAbortedRef.current = true; 
      const pointers = Array.from(activePointersRef.current.values());
      pinchStartDistRef.current = getPointerDistance(pointers[0], pointers[1]);
      pinchStartZoomRef.current = zoom;
      pinchStartCenterRef.current = { x: (pointers[0].clientX + pointers[1].clientX) / 2, y: (pointers[0].clientY + pointers[1].clientY) / 2 };
      if (canvasScrollRef.current) {
        pinchStartScrollRef.current = { left: canvasScrollRef.current.scrollLeft, top: canvasScrollRef.current.scrollTop };
      }
      
      if (draftRef.current) {
        setProject(deepClone(historyRef.current[historyIndexRef.current]));
        draftRef.current = null;
      }
      setIsDrawing(false); setMovingSelection(false); setDraggingStamp(false);
      return;
    }

    if (activePointersRef.current.size > 2) return; 

    sessionAbortedRef.current = false; 
    e.preventDefault(); try { canvasRef.current.setPointerCapture(e.pointerId); } catch (_) {}
    const { gx, gy } = getGridCoords(e); setHoverCell({ gx, gy });
    if (!activeLayer || activeLayer.locked) return;

    if (activeTool === "pencil" || activeTool === "eraser") {
      beginStroke();
      if (activeTool === "eraser") eraseLineLive({ gx, gy }, { gx, gy });
      else { paintLineLive({ gx, gy }, { gx, gy }, activeColor); addRecentColor(activeColor); }
      lastPaintRef.current = { gx, gy }; setIsDrawing(true);
    } else if (activeTool === "line" || activeTool === "rect") {
      beginStroke(); shapeBaselineRef.current = deepClone(draftRef.current); shapeStartRef.current = { gx, gy }; setIsDrawing(true);
    } else if (activeTool === "bucket") {
      bucketFill(gx, gy, activeColor);
    } else if (activeTool === "stamp") {
      placeStamp(gx, gy);
    } else if (activeTool === "select") {
      const stampHit = findStampAt(gx, gy);
      if (stampHit) {
        setSelection(null); setSelectedStampId(stampHit.id); beginStroke();
        stampDragAnchorRef.current = { gx, gy }; stampOrigRef.current = { gx: stampHit.gx, gy: stampHit.gy }; setDraggingStamp(true); return;
      }
      setSelectedStampId(null);
      if (selection && gx >= Math.min(selection.x0, selection.x1) && gx <= Math.max(selection.x0, selection.x1) && gy >= Math.min(selection.y0, selection.y1) && gy <= Math.max(selection.y0, selection.y1)) {
        const x0 = Math.min(selection.x0, selection.x1), y0 = Math.min(selection.y0, selection.y1);
        const w = Math.max(selection.x0, selection.x1) - x0 + 1, h = Math.max(selection.y0, selection.y1) - y0 + 1;
        beginStroke();
        const next = draftRef.current, layer = next.layers.find((l) => l.id === next.activeLayerId), block = {};
        for (let x = x0; x < x0 + w; x++) for (let y = y0; y < y0 + h; y++) { const k = `${x},${y}`; if (layer.cells[k] !== undefined) { block[`${x - x0},${y - y0}`] = layer.cells[k]; delete layer.cells[k]; } }
        movingBlockRef.current = block; moveBaselineRef.current = deepClone(next); moveAnchorRef.current = { x0, y0 }; moveDimRef.current = { w, h }; moveStartGridRef.current = { gx, gy };
        setProject({ ...next }); setMovingSelection(true);
      } else { setIsDrawing(true); setSelection({ x0: gx, y0: gy, x1: gx, y1: gy }); }
    }
  }

  function handlePointerMove(e) {
    if (!activePointersRef.current.has(e.pointerId)) return;
    
    // UPDATE HANYA KOORDINAT, BUKAN OBJEK EVENT
    activePointersRef.current.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

    if (activePointersRef.current.size === 2 && pinchStartDistRef.current) {
      e.preventDefault(); e.stopPropagation();
      const pointers = Array.from(activePointersRef.current.values());
      
      // Proteksi aman (safety check) agar tidak crash jika array belum siap
      if (pointers.length === 2 && pointers[0] && pointers[1]) {
        const currentDist = getPointerDistance(pointers[0], pointers[1]);
        setZoom(Math.max(0.2, Math.min(5, pinchStartZoomRef.current * (currentDist / pinchStartDistRef.current))));

        // Geser layar (pan) mengikuti titik tengah 2 jari
        if (pinchStartCenterRef.current && pinchStartScrollRef.current && canvasScrollRef.current) {
          const cx = (pointers[0].clientX + pointers[1].clientX) / 2;
          const cy = (pointers[0].clientY + pointers[1].clientY) / 2;
          const dx = cx - pinchStartCenterRef.current.x;
          const dy = cy - pinchStartCenterRef.current.y;
          canvasScrollRef.current.scrollLeft = pinchStartScrollRef.current.left - dx;
          canvasScrollRef.current.scrollTop = pinchStartScrollRef.current.top - dy;
        }
      }
      return;
    }

    if (activePointersRef.current.size > 1 || sessionAbortedRef.current) return;

    const { gx, gy } = getGridCoords(e); setHoverCell({ gx, gy });
    if (isDrawing && draftRef.current && (activeTool === "pencil" || activeTool === "eraser")) { 
      const from = lastPaintRef.current || { gx, gy };
      if (activeTool === "eraser") eraseLineLive(from, { gx, gy }); else paintLineLive(from, { gx, gy }, activeColor);
      lastPaintRef.current = { gx, gy };
    } else if (isDrawing && draftRef.current && (activeTool === "line" || activeTool === "rect") && shapeStartRef.current) {
      const next = deepClone(shapeBaselineRef.current), layer = next.layers.find((l) => l.id === next.activeLayerId), { gx: sx, gy: sy } = shapeStartRef.current;
      if (activeTool === "line") { bresenhamLine(sx, sy, gx, gy).forEach(([x, y]) => { layer.cells[`${x},${y}`] = activeColor; }); }
      else {
        const x0 = Math.min(sx, gx), x1 = Math.max(sx, gx), y0 = Math.min(sy, gy), y1 = Math.max(sy, gy);
        for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) if (rectFilled || x === x0 || x === x1 || y === y0 || y === y1) layer.cells[`${x},${y}`] = activeColor;
      }
      setProject(next); draftRef.current = next;
    } else if (isDrawing && activeTool === "select") { setSelection((sel) => (sel ? { ...sel, x1: gx, y1: gy } : sel));
    } else if (movingSelection && moveStartGridRef.current && moveBaselineRef.current) {
      updateMovePreview(Math.max(0, Math.min(gridCols - moveDimRef.current.w, moveAnchorRef.current.x0 + (gx - moveStartGridRef.current.gx))), Math.max(0, Math.min(gridRows - moveDimRef.current.h, moveAnchorRef.current.y0 + (gy - moveStartGridRef.current.gy))));
    } else if (draggingStamp && selectedStampId && stampDragAnchorRef.current && draftRef.current) {
      const next = draftRef.current, st = next.layers.find((l) => l.id === next.activeLayerId).stamps.find((s) => s.id === selectedStampId);
      if (st) {
        const { w, h } = getEffectiveFootprint(st);
        st.gx = Math.max(0, Math.min(Math.max(0, gridCols - w), stampOrigRef.current.gx + (gx - stampDragAnchorRef.current.gx))); st.gy = Math.max(0, Math.min(Math.max(0, gridRows - h), stampOrigRef.current.gy + (gy - stampDragAnchorRef.current.gy)));
        setProject({ ...next });
      }
    }
  }

  function handlePointerUp(e) {
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) { pinchStartDistRef.current = null; pinchStartCenterRef.current = null; pinchStartScrollRef.current = null; }

    if (sessionAbortedRef.current) {
      if (activePointersRef.current.size === 0) sessionAbortedRef.current = false;
      setIsDrawing(false); setMovingSelection(false); setDraggingStamp(false);
      try { canvasRef.current && canvasRef.current.releasePointerCapture(e.pointerId); } catch (_) {}
      return;
    }
    
    if (activePointersRef.current.size > 0) return; 

    if (isDrawing && draftRef.current && (activeTool === "pencil" || activeTool === "eraser")) {
      if (activeTool === "eraser" && selectedStampId && draftRef.current) { if (!draftRef.current.layers.find((l) => l.id === draftRef.current.activeLayerId)?.stamps.find((s) => s.id === selectedStampId)) setSelectedStampId(null); }
      pushHistory(draftRef.current); draftRef.current = null; lastPaintRef.current = null;
    } else if (isDrawing && draftRef.current && (activeTool === "line" || activeTool === "rect")) {
      pushHistory(draftRef.current); addRecentColor(activeColor); draftRef.current = null; shapeBaselineRef.current = null; shapeStartRef.current = null;
    } else if (isDrawing && activeTool === "select") {
      setSelection((sel) => sel ? { x0: Math.min(sel.x0, sel.x1), y0: Math.min(sel.y0, sel.y1), x1: Math.max(sel.x0, sel.x1), y1: Math.max(sel.y0, sel.y1) } : sel);
    } else if (movingSelection && draftRef.current) { pushHistory(draftRef.current); draftRef.current = null; movingBlockRef.current = null; moveBaselineRef.current = null;
    } else if (draggingStamp && draftRef.current) { pushHistory(draftRef.current); draftRef.current = null; }
    
    setIsDrawing(false); setMovingSelection(false); setDraggingStamp(false);
    try { canvasRef.current && canvasRef.current.releasePointerCapture(e.pointerId); } catch (_) {}
  }

  function handlePointerLeave(e) { 
    activePointersRef.current.delete(e.pointerId);
    if (activePointersRef.current.size < 2) { pinchStartDistRef.current = null; pinchStartCenterRef.current = null; pinchStartScrollRef.current = null; }
    if (!isDrawing && !movingSelection && !draggingStamp) setHoverCell(null); 
  }
  
  /* --------------------------- gesture pinch to zoom --------------------------- */
  function getPointerDistance(p1, p2) { 
    return Math.hypot(p1.clientX - p2.clientX, p1.clientY - p2.clientY); 
  }
  function handleWheel(e) { if (e.ctrlKey || e.metaKey) { e.preventDefault(); setZoom((z) => Math.max(0.2, Math.min(5, z + (e.deltaY < 0 ? 0.1 : -0.1)))); } }
  useEffect(() => { const stage = document.getElementById("canvas-stage"); if(stage) { stage.addEventListener('wheel', handleWheel, {passive: false}); return () => stage.removeEventListener('wheel', handleWheel); } }, []);
  useEffect(() => {
    function onKey(e) {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "Delete" || e.key === "Backspace") { if (selection) deleteSelection(); else if (selectedStampId) deleteSelectedStamp(); }
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); }
    }
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [selection, selectedStampId, project]);

  /* --------------------------- menu actions --------------------------- */
  function applyGridSize(newCols, newRows, label) {
    const next = deepClone(project);
    next.layers.forEach((layer) => {
      const newCells = {};
      for (let ny = 0; ny < newRows; ny++) for (let nx = 0; nx < newCols; nx++) { const c = layer.cells[`${Math.floor((nx * gridCols) / newCols)},${Math.floor((ny * gridRows) / newRows)}`]; if (c) newCells[`${nx},${ny}`] = c; }
      layer.cells = newCells;
    });
    commit(next); setGridCols(newCols); setGridRows(newRows); setCustomW(newCols); setCustomH(newRows); setGridSizeLabel(label || `${newCols}×${newRows}`);
  }
  function addLayer() { const next = deepClone(project), layer = makeLayer(`Layer ${next.layers.length + 1}`); next.layers.push(layer); next.activeLayerId = layer.id; commit(next); }
  function removeLayer(id) { const next = deepClone(project); if (next.layers.length <= 1) return; next.layers = next.layers.filter((l) => l.id !== id); if (next.activeLayerId === id) next.activeLayerId = next.layers[0].id; commit(next); }
  function duplicateLayer(id) { const next = deepClone(project), idx = next.layers.findIndex((l) => l.id === id), clone = deepClone(next.layers[idx]); clone.id = uid(); clone.name = clone.name + " copy"; next.layers.splice(idx + 1, 0, clone); commit(next); }
  function toggleVisible(id) { const next = deepClone(project); next.layers.find((x) => x.id === id).visible = !next.layers.find((x) => x.id === id).visible; commit(next); }
  function toggleLock(id) { const next = deepClone(project); next.layers.find((x) => x.id === id).locked = !next.layers.find((x) => x.id === id).locked; commit(next); }
  function renameLayer(id, name) { const next = deepClone(project); next.layers.find((l) => l.id === id).name = name; commit(next); }
  function setOpacity(id, val) { const next = deepClone(project); next.layers.find((l) => l.id === id).opacity = val; commit(next); }
  function moveLayer(id, dir) { const next = deepClone(project), idx = next.layers.findIndex((l) => l.id === id), newIdx = idx + dir; if (newIdx < 0 || newIdx >= next.layers.length) return; const [item] = next.layers.splice(idx, 1); next.layers.splice(newIdx, 0, item); commit(next); }
  function mergeDown(id) { const next = deepClone(project), idx = next.layers.findIndex((l) => l.id === id); if (idx <= 0) return; const below = next.layers[idx - 1], cur = next.layers[idx]; below.cells = { ...below.cells, ...cur.cells }; below.stamps = [...below.stamps, ...cur.stamps]; next.layers.splice(idx, 1); if (next.activeLayerId === cur.id) next.activeLayerId = below.id; commit(next); }
  function setActiveLayerId(id) { setProject((p) => ({ ...p, activeLayerId: id })); }
  function newCanvas() { if (!window.confirm("Buat kanvas baru? Semua perubahan akan hilang.")) return; const layer = makeLayer("Layer 1"); commit({ layers: [layer], activeLayerId: layer.id }); setSelection(null); setSelectedStampId(null); }
  function saveProject() { const blob = new Blob([JSON.stringify({ version: 4, gridCols, gridRows, project, customCsvStamps, customImageStamps }, null, 2)], { type: "application/json" }), url = URL.createObjectURL(blob), a = document.createElement("a"); a.href = url; a.download = "projek.saku"; a.click(); URL.revokeObjectURL(url); }
  function handleOpenFile(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        setGridCols(data.gridCols); setGridRows(data.gridRows); setCustomW(data.gridCols); setCustomH(data.gridRows); setGridSizeLabel(`${data.gridCols}×${data.gridRows}`);
        setProject(data.project); setCustomCsvStamps(data.customCsvStamps || []); setCustomImageStamps(data.customImageStamps || []); pushHistory(data.project); setSelection(null); setSelectedStampId(null);
      } catch (err) { window.alert("File .saku tidak valid atau rusak."); }
    }; reader.readAsText(file); e.target.value = "";
  }

  function renderToOffscreen(scale, withBg) {
    const off = document.createElement("canvas"); off.width = gridCols * scale; off.height = gridRows * scale; const ctx = off.getContext("2d");
    if (withBg) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, off.width, off.height); }
    project.layers.forEach((layer) => {
      if (!layer.visible) return; ctx.globalAlpha = layer.opacity;
      Object.entries(layer.cells).forEach(([key, color]) => { const [x, y] = key.split(",").map(Number); ctx.fillStyle = color; ctx.fillRect(x * scale, y * scale, scale, scale); });
      layer.stamps.forEach((st) => drawStampOnCtx(ctx, st, scale, imageCacheRef));
    }); ctx.globalAlpha = 1; return off;
  }
  function exportPNG() { renderToOffscreen(exportScale, false).toBlob((blob) => { const url = URL.createObjectURL(blob), a = document.createElement("a"); a.href = url; a.download = "sahabatku.png"; a.click(); URL.revokeObjectURL(url); }); }
  function exportSVG() {
    const scale = 20; let rects = "";
    project.layers.forEach((layer) => {
      if (!layer.visible) return;
      Object.entries(layer.cells).forEach(([key, color]) => { const [x, y] = key.split(",").map(Number); rects += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${color}" opacity="${layer.opacity}"/>`; });
      layer.stamps.forEach((st) => {
        const { w: effW, h: effH } = getEffectiveFootprint(st), cx = (st.gx + effW / 2) * scale, cy = (st.gy + effH / 2) * scale, boxW = st.footprintW * scale, boxH = st.footprintH * scale;
        if (st.type === "image") rects += `<g transform="translate(${cx},${cy}) rotate(${st.rotation})" opacity="${layer.opacity}"><image href="${st.imageSrc}" x="${-boxW / 2}" y="${-boxH / 2}" width="${boxW}" height="${boxH}"/></g>`;
        else { let inner = ""; st.cells.forEach(([px, py]) => { inner += `<rect x="${-boxW / 2 + px * (boxW / st.patternW)}" y="${-boxH / 2 + py * (boxH / st.patternH)}" width="${boxW / st.patternW}" height="${boxH / st.patternH}" fill="${st.color}"/>`; }); rects += `<g transform="translate(${cx},${cy}) rotate(${st.rotation})" opacity="${layer.opacity}">${inner}</g>`; }
      });
    });
    const blob = new Blob([`<svg xmlns="http://www.w3.org/2000/svg" width="${gridCols * scale}" height="${gridRows * scale}" viewBox="0 0 ${gridCols * scale} ${gridRows * scale}">${rects}</svg>`], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob), a = document.createElement("a"); a.href = url; a.download = "sahabatku.svg"; a.click(); URL.revokeObjectURL(url);
  }
  function exportPDF() {
    const dataUrl = renderToOffscreen(exportScale, true).toDataURL("image/png"), iframe = document.createElement("iframe");
    iframe.style.position = "fixed"; iframe.style.right = "0"; iframe.style.bottom = "0"; iframe.style.width = "0"; iframe.style.height = "0"; iframe.style.border = "0";
    document.body.appendChild(iframe); const doc = iframe.contentWindow.document; doc.open(); doc.write(`<html><head><title>SahabatKu</title></head><body style="margin:0"><img src="${dataUrl}" style="width:100%" /></body></html>`); doc.close();
    iframe.onload = () => { iframe.contentWindow.focus(); iframe.contentWindow.print(); setTimeout(() => document.body.removeChild(iframe), 1000); };
  }
  function zoomStep(dir) {
    const idx = ZOOM_STEPS.indexOf(zoom);
    const newIdx = Math.max(0, Math.min(ZOOM_STEPS.length - 1, (idx === -1 ? 4 : idx) + dir));
    setZoom(ZOOM_STEPS[newIdx]);
  }

  const hasActiveObject = !!selection || !!selectedStampId;

  /* ================================ render ================================ */
  return (
    <div style={{ background: C.chrome, color: C.text, fontFamily: "'Inter', ui-sans-serif, system-ui" }} className="w-full h-screen flex flex-col overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Inter:wght@400;500;600;700&display=swap');
        input[type=range]{ accent-color: ${C.gold}; }
        input[type=color]{ opacity: 0; position: absolute; left: 0; top: 0; width: 100%; height: 100%; cursor: pointer; }
        ::-webkit-scrollbar{ width:6px; height:6px; }
        ::-webkit-scrollbar-thumb{ background:${C.line}; border-radius:4px; }
        ::-webkit-scrollbar-track{ background: transparent; }
        .touch-action-none { touch-action: none !important; }
      `}</style>

      {/* ---------- MODAL TENTANG SAKU ---------- */}
      {showAbout && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-lg shadow-2xl p-6" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <button onClick={() => setShowAbout(false)} className="absolute top-3 right-3 p-1 rounded transition-colors" style={{ color: C.muted }} onMouseEnter={(e) => (e.currentTarget.style.background = C.panelAlt)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              <X size={18} />
            </button>
            
            <div className="flex flex-col items-center text-center mt-2">
              <img src={customLogo} alt="SAKU Logo" className="w-16 h-16 object-contain mb-4 drop-shadow-md" />
              <h2 className="text-xl font-bold tracking-wide mb-2" style={{ color: C.text }}>SAKU: Sahabat Kufi</h2>
              <p className="text-xs leading-relaxed mb-5" style={{ color: C.muted }}>
                Aplikasi kanvas web interaktif untuk mendesain kaligrafi Kufi Murabba' dan pixel art. Dirancang dengan presisi grid untuk memudahkan proses kreatif Anda.
              </p>
              
              <div className="w-full h-px mb-5" style={{ background: C.line }} />
              
              <p className="text-[11px] mb-2 font-medium" style={{ color: C.text }}>
                Created by @syarifkufi & @sahabat.sekufi &copy; 2026
              </p>
              <p className="text-[10px] leading-relaxed px-2" style={{ color: C.muted }}>
                Untuk kritik, saran, atau berkolaborasi, silakan DM via Instagram <br/>
                <a href="https://instagram.com/syarifkufi" target="_blank" rel="noreferrer" className="font-semibold underline transition-opacity hover:opacity-80" style={{ color: C.gold }}>@syarifkufi</a>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------- top bar ---------- */}
      <div className="flex items-center px-4 h-14 shrink-0 border-b relative" style={{ background: C.panel, borderColor: C.line }}>
        
        {/* LOGO & NAMA APLIKASI */}
        <div className="flex items-center gap-2 mr-3 shrink-0 z-10 sticky left-0" style={{ background: C.panel }}>
          <img src={customLogo} alt="SahabatKu Logo" style={{ height: "32px", width: "auto", objectFit: "contain" }} className="shrink-0" />
          <span className="font-bold text-sm tracking-wide hidden md:inline ml-1" style={{ color: C.text }}>SAKU: Sahabat Kufi</span>
        </div>
        
        {/* MENU UTAMA */}
        <div className="flex items-center gap-1.5 overflow-x-auto overflow-y-hidden flex-1 pb-1">
          <div className="w-px h-6 shrink-0 mx-1" style={{ background: C.line }} />
          <IconBtn C={C} title="Baru" onClick={newCanvas}><FilePlus2 size={16} /></IconBtn>
          <IconBtn C={C} title="Simpan (.saku)" onClick={saveProject}><Save size={16} /></IconBtn>
          <IconBtn C={C} title="Buka file .saku" onClick={() => fileInputRef.current.click()}><FolderOpen size={16} /></IconBtn>
          <input ref={fileInputRef} type="file" accept=".saku,.json" className="hidden" onChange={handleOpenFile} />
          
          <div className="w-px h-6 shrink-0 mx-1" style={{ background: C.line }} />
          <IconBtn C={C} title="Undo (Ctrl+Z)" disabled={!canUndo} onClick={undo}><Undo2 size={16} /></IconBtn>
          <IconBtn C={C} title="Redo (Ctrl+Shift+Z)" disabled={!canRedo} onClick={redo}><Redo2 size={16} /></IconBtn>
          
          <div className="w-px h-6 shrink-0 mx-1" style={{ background: C.line }} />
          <div className="flex items-center shrink-0">
              <IconBtn C={C} title="Perkecil" onClick={() => zoomStep(-1)}><ZoomOut size={16} /></IconBtn>
              <span className="text-[11px] w-8 text-center" style={{ color: C.muted }}>{Math.round(zoom * 100)}%</span>
              <IconBtn C={C} title="Perbesar" onClick={() => zoomStep(1)}><ZoomIn size={16} /></IconBtn>
          </div>
          
          <div className="w-px h-6 shrink-0 mx-1" style={{ background: C.line }} />
          
          <div className="flex items-center gap-1 shrink-0">
              <div className="relative mr-1">
                 <button
                    ref={exportScaleBtnRef}
                    title="Skala Export"
                    onClick={toggleExportScale}
                    className="text-[10px] px-2 py-1 rounded cursor-pointer flex items-center gap-1"
                    style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}
                 >
                    {exportScale}x <ChevronDown size={10} />
                 </button>
              </div>
              <IconBtn C={C} title="Export PNG" onClick={exportPNG}><ImageIcon size={16} /></IconBtn>
              <IconBtn C={C} title="Export SVG" onClick={exportSVG}><FileText size={16} /></IconBtn>
              <IconBtn C={C} title="Export PDF" onClick={exportPDF}><Printer size={16} /></IconBtn>
              
              <div className="w-px h-6 shrink-0 mx-1" style={{ background: C.line }} />
              {/* IKON BANTUAN/TENTANG APLIKASI (KREDIT) */}
              <IconBtn C={C} title="Tentang SAKU" onClick={() => setShowAbout(true)}>
                 <HelpCircle size={16} />
              </IconBtn>
          </div>
        </div>
      </div>

      {/* Popover Skala Export - dirender di root agar tidak ke-clip oleh overflow toolbar */}
      {showExportScale && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowExportScale(false)} />
          <div
             className="fixed z-50 w-48 p-2.5 rounded shadow-2xl"
             style={{ top: exportScalePos.top, left: exportScalePos.left, background: C.panelAlt, border: `1px solid ${C.line}` }}
          >
             <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px]" style={{ color: C.muted }}>Skala Export (PNG/PDF)</span>
                <input
                   type="number" min={1} max={100} value={exportScale}
                   onChange={(e) => setExportScale(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                   className="w-11 text-[11px] px-1 py-0.5 rounded text-center"
                   style={{ background: C.chrome, border: `1px solid ${C.line}`, color: C.text }}
                />
             </div>
             <input
                type="range" min={1} max={100} step={1} value={exportScale}
                onChange={(e) => setExportScale(Number(e.target.value))}
                className="w-full"
             />
             <div className="flex flex-wrap gap-1 mt-1.5">
                {[1, 4, 8, 16, 32, 64, 100].map((v) => (
                   <button
                      key={v} onClick={() => setExportScale(v)}
                      className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{ background: exportScale === v ? C.goldSoft : "transparent", color: exportScale === v ? C.gold : C.text, border: `1px solid ${C.line}` }}
                   >{v}x</button>
                ))}
             </div>
             <p className="text-[9px] mt-2" style={{ color: C.muted }}>
                Hasil: {gridCols * exportScale}×{gridRows * exportScale}px
                {gridCols * exportScale > 8000 && (
                   <span style={{ color: C.danger }}> — sangat besar, export bisa lambat/berat</span>
                )}
             </p>
          </div>
        </>
      )}

      {/* ---------- main area ---------- */}
      <div className="flex flex-1 min-h-0 relative overflow-hidden">
        
        {/* left toolbar */}
        <div className="w-12 md:w-14 shrink-0 border-r flex flex-col items-center py-2 md:py-3 gap-1 z-20 transition-colors" style={{ background: C.panel, borderColor: C.line }}>
          <ToolBtn C={C} active={activeTool === "pencil"} title="Pensil" onClick={() => setActiveTool("pencil")}><Pencil size={18} /></ToolBtn>
          <ToolBtn C={C} active={activeTool === "eraser"} title="Penghapus" onClick={() => setActiveTool("eraser")}><Eraser size={18} /></ToolBtn>
          <ToolBtn C={C} active={activeTool === "select"} title="Pilih" onClick={() => setActiveTool("select")}><MousePointer2 size={18} /></ToolBtn>
          <ToolBtn C={C} active={activeTool === "bucket"} title="Bucket" onClick={() => setActiveTool("bucket")}><PaintBucket size={18} /></ToolBtn>
          <ToolBtn C={C} active={activeTool === "line"} title="Garis" onClick={() => setActiveTool("line")}><Slash size={18} /></ToolBtn>
          <ToolBtn C={C} active={activeTool === "rect"} title="Kotak" onClick={() => setActiveTool("rect")}><Square size={18} /></ToolBtn>
          <div className="w-6 md:w-8 h-px my-1" style={{ background: C.line }} />
          <ToolBtn C={C} title="Rotasi" disabled={!hasActiveObject} onClick={rotateActive}><RotateCw size={18} /></ToolBtn>
          <ToolBtn C={C} active={activeTool === "stamp"} title="Stempel" onClick={() => setActiveTool("stamp")}><Stamp size={18} /></ToolBtn>
        </div>

        {/* canvas stage */}
        <div id="canvas-stage" className="flex-1 min-w-0 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: C.chrome === "#121212" ? "#0A0A0A" : "#12151A" }}>
          {hasActiveObject ? (
            <div className="absolute top-3 flex items-center gap-2 px-2 py-1.5 rounded shadow-lg z-10" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
              <span className="text-[10px] md:text-xs" style={{ color: C.text }}>{selection ? "Seleksi aktif" : "Stempel terpilih"}</span>
              <button className="flex items-center gap-1 text-[10px] md:text-xs px-2 py-1 rounded" style={{ background: C.goldSoft, color: C.gold }} onClick={rotateActive}><RotateCw size={13} /> Rotasi</button>
              <button className="flex items-center gap-1 text-[10px] md:text-xs px-2 py-1 rounded" style={{ background: "rgba(209,73,91,0.15)", color: C.danger }} onClick={deleteActive}><Trash2 size={13} /> Hapus</button>
              <button className="p-1 rounded" style={{ color: C.muted }} onClick={() => { setSelection(null); setSelectedStampId(null); }}><X size={14} /></button>
            </div>
          ) : activeTool === "rect" ? (
            <div className="absolute top-3 flex items-center gap-2 px-2 py-1.5 rounded shadow-lg z-10" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
              <span className="text-[10px] md:text-xs" style={{ color: C.text }}>Kotak</span>
              <button onClick={() => setRectFilled((f) => !f)} className="flex items-center gap-1 text-[10px] md:text-xs px-2 py-1 rounded" style={{ background: rectFilled ? C.goldSoft : "transparent", color: rectFilled ? C.gold : C.text, border: `1px solid ${C.line}` }}>
                <Square size={13} /> {rectFilled ? "Terisi" : "Garis Tepi"}
              </button>
            </div>
          ) : (activeTool === "pencil" || activeTool === "eraser") ? (
            <div className="absolute top-3 flex items-center gap-2 px-3 py-1.5 rounded shadow-lg z-10" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
              <span className="text-[10px] md:text-xs font-medium" style={{ color: C.text }}>Ukuran</span>
              <input 
                 type="range" min={1} max={10} step={1} value={brushSize} 
                 onChange={(e) => setBrushSize(Number(e.target.value))} 
                 className="w-20 md:w-28 h-1" 
              />
              <span className="text-[10px] md:text-xs w-4 text-center font-bold" style={{ color: C.gold }}>{brushSize}</span>
            </div>
          ) : null}
          
          <div ref={canvasScrollRef} className="max-w-full max-h-full overflow-auto p-4 md:p-6" style={{ touchAction: "none" }}>
            <canvas
              ref={canvasRef} draggable={false} onDragStart={(e) => e.preventDefault()}
              onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp} onPointerLeave={handlePointerLeave}
              style={{ 
                cursor: activeTool === "select" ? "default" : "crosshair", 
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)", 
                imageRendering: "pixelated",
                touchAction: "none" // <--- TAMBAHKAN BARIS INI
              }}
            />
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className={`absolute top-0 right-0 h-full z-30 transition-transform duration-300 flex border-l md:relative shadow-2xl md:shadow-none`} 
             style={{ background: C.panel, borderColor: C.line, transform: sidebarExpanded ? 'translateX(0)' : 'translateX(100%)' }}>
          
          {/* Toggle Panel Button */}
          <div 
             onClick={toggleSidebar}
             className="absolute top-1/2 -left-6 md:-left-5 -translate-y-1/2 w-6 md:w-5 h-16 md:h-12 flex items-center justify-center cursor-pointer rounded-l-md shadow-[0_0_10px_rgba(0,0,0,0.5)] md:shadow-md" 
             style={{ background: C.panelAlt, border: `1px solid ${C.line}`, borderRight: "none" }}
             title={sidebarExpanded ? "Tutup Panel" : "Buka Panel"}
          >
            {sidebarExpanded ? <ChevronRight size={18} color={C.gold} /> : <ChevronLeft size={18} color={C.gold} />}
          </div>

          {!sidebarExpanded && (
            <div className="w-12 h-full hidden md:flex flex-col items-center py-4 gap-3 absolute right-[100%] border-l" style={{ background: C.panel, borderColor: C.line }}>
              <PanelToggle C={C} title="Buka Panel Grid" onClick={() => openPanel("grid")}><Grid3x3 size={18} /></PanelToggle>
              <PanelToggle C={C} title="Buka Panel Warna" onClick={() => openPanel("color")}><Palette size={18} /></PanelToggle>
              <PanelToggle C={C} title="Buka Panel Stempel" onClick={() => openPanel("stamp")}><Stamp size={18} /></PanelToggle>
              <PanelToggle C={C} title="Buka Panel Layer" onClick={() => openPanel("layer")}><LayersIcon size={18} /></PanelToggle>
            </div>
          )}

          {/* Expanded State: Full Panels */}
          <div className="w-64 md:w-72 h-full flex flex-col" style={{ background: C.panel }}>
            <div className="flex items-center justify-between px-4 py-3 border-b shrink-0" style={{ borderColor: C.line }}>
              <span className="text-sm font-semibold" style={{ color: C.text }}>Panel Kontrol</span>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-20">
              
              {/* PANEL TEMA */}
              <Panel C={C} title="Tema Aplikasi" icon={<Palette size={14} />} open={panels.theme.open} collapsed={panels.theme.collapsed} onToggleCollapse={() => togglePanelCollapsed("theme")} onClose={() => closePanel("theme")} noCloseIcon>
                 <select 
                    value={appThemeName} 
                    onChange={(e) => setAppThemeName(e.target.value)} 
                    className="w-full text-[11px] md:text-xs px-2 py-1.5 rounded" 
                    style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}
                 >
                    {Object.keys(APP_THEMES).map((name) => (<option key={name} value={name}>{name}</option>))}
                 </select>
              </Panel>

              {/* GRID */}
              <Panel C={C} title="Kanvas & Grid" icon={<Grid3x3 size={14} />} open={panels.grid.open} collapsed={panels.grid.collapsed} onToggleCollapse={() => togglePanelCollapsed("grid")} onClose={() => closePanel("grid")}>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {GRID_PRESETS.map((p) => (
                    <button key={p.label} onClick={() => applyGridSize(p.cols, p.rows, p.label)} className="text-xs px-2 py-1 rounded border" style={{ borderColor: gridSizeLabel === p.label ? C.gold : C.line, color: gridSizeLabel === p.label ? C.gold : C.text }}>{p.label}</button>
                  ))}
                  <button onClick={() => setGridSizeLabel("custom")} className="text-xs px-2 py-1 rounded border" style={{ borderColor: gridSizeLabel === "custom" ? C.gold : C.line, color: gridSizeLabel === "custom" ? C.gold : C.text }}>Custom</button>
                </div>
                {gridSizeLabel === "custom" && (
                  <div className="flex items-center gap-2 mb-3">
                    <input type="number" min={4} max={128} value={customW} onChange={(e) => setCustomW(Number(e.target.value))} className="w-12 text-xs px-1 py-1 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                    <span className="text-xs" style={{ color: C.muted }}>×</span>
                    <input type="number" min={4} max={128} value={customH} onChange={(e) => setCustomH(Number(e.target.value))} className="w-12 text-xs px-1 py-1 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                    <button onClick={() => applyGridSize(customW, customH, "custom")} className="text-[10px] px-2 py-1 rounded font-bold" style={{ background: C.gold, color: C.chrome }}>Set</button>
                  </div>
                )}
                <ToggleRow C={C} label="Tampilkan Grid" checked={showGrid} onChange={setShowGrid} />
                <ToggleRow C={C} label="Grid Alternatif" checked={showAltShading} onChange={setShowAltShading} />
              </Panel>

              {/* WARNA */}
              <Panel C={C} title="Warna" icon={<Palette size={14} />} open={panels.color.open} collapsed={panels.color.collapsed} onToggleCollapse={() => togglePanelCollapsed("color")} onClose={() => closePanel("color")}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded border-2 shadow-sm" style={{ background: activeColor, borderColor: C.line }} />
                  
                  {/* COLOR PICKER ICON */}
                  <div className="relative w-8 h-8 rounded flex items-center justify-center cursor-pointer overflow-hidden transition-colors hover:opacity-80" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }} title="Pilih Warna Kustom">
                    <Pipette size={14} color={C.muted} />
                    <input type="color" value={pickerColor} onChange={(e) => { setPickerColor(e.target.value); pickColor(e.target.value); }} />
                  </div>
                  
                  <button onClick={() => setCustomPalette((prev) => (prev.includes(pickerColor) ? prev : [...prev, pickerColor].slice(-16)))} className="text-[10px] px-2 py-1.5 rounded flex items-center gap-1 ml-auto font-medium" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}><Plus size={12} /> Ke Palet</button>
                </div>
                <select value={activePaletteName} onChange={(e) => setActivePaletteName(e.target.value)} className="w-full text-[11px] md:text-xs px-2 py-1.5 rounded mb-2" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}>
                  {Object.keys(PALETTES).map((name) => (<option key={name} value={name}>{name}</option>))}
                </select>
                <div className="flex flex-wrap gap-1.5 mb-3">{PALETTES[activePaletteName].map((c) => (<Swatch key={c} C={C} color={c} active={c === activeColor} onClick={() => pickColor(c)} />))}</div>
                {customPalette.length > 0 && (<><p className="text-[10px] mb-1" style={{ color: C.muted }}>Palet Kustom</p><div className="flex flex-wrap gap-1.5 mb-3">{customPalette.map((c) => (<Swatch key={c} C={C} color={c} active={c === activeColor} onClick={() => pickColor(c)} />))}</div></>)}
                {recentColors.length > 0 && (<><p className="text-[10px] mb-1" style={{ color: C.muted }}>Riwayat</p><div className="flex flex-wrap gap-1.5">{recentColors.map((c, i) => (<Swatch key={c + i} C={C} color={c} active={c === activeColor} onClick={() => pickColor(c)} />))}</div></>)}
              </Panel>

              {/* STEMPEL */}
              <Panel C={C} title="Stempel" icon={<Stamp size={14} />} open={panels.stamp.open} collapsed={panels.stamp.collapsed} onToggleCollapse={() => togglePanelCollapsed("stamp")} onClose={() => closePanel("stamp")}>
                
                {/* Accordion Kufi Stamp */}
                <div className="mb-2 border rounded overflow-hidden" style={{ borderColor: C.line }}>
                  <button onClick={() => setStampCats(c => ({...c, kufi: !c.kufi}))} className="w-full px-2 py-1.5 flex justify-between items-center text-[11px]" style={{ background: stampCats.kufi ? C.panelAlt : 'transparent', color: C.text }}>
                    <span className="font-medium">Kufi Stamp</span>
                    {stampCats.kufi ? <ChevronDown size={12}/> : <ChevronUp size={12}/>}
                  </button>
                  {stampCats.kufi && (
                    <div className="p-2 grid grid-cols-4 md:grid-cols-3 gap-1.5" style={{ background: C.chrome }}>
                      {BUILTIN_STAMPS_KUFI.map((s) => (
                        <button key={s.id} title={s.label} onClick={() => { setStampChoiceId(s.id); setActiveTool("stamp"); }} className="aspect-square rounded border p-1 flex items-center justify-center transition-colors hover:opacity-80" style={{ borderColor: stampChoiceId === s.id ? C.gold : C.line, background: stampChoiceId === s.id ? C.goldSoft : C.panelAlt }}>
                          <MiniStampCells cells={s.cells} w={s.w} h={s.h} color={stampChoiceId === s.id ? C.gold : C.muted} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion Huruf Kufi */}
                <div className="mb-2 border rounded overflow-hidden" style={{ borderColor: C.line }}>
                  <button onClick={() => setStampCats(c => ({...c, huruf: !c.huruf}))} className="w-full px-2 py-1.5 flex justify-between items-center text-[11px]" style={{ background: stampCats.huruf ? C.panelAlt : 'transparent', color: C.text }}>
                    <span className="font-medium">Huruf Kufi</span>
                    {stampCats.huruf ? <ChevronDown size={12}/> : <ChevronUp size={12}/>}
                  </button>
                  {stampCats.huruf && (
                    <div className="p-2 grid grid-cols-4 md:grid-cols-3 gap-1.5" style={{ background: C.chrome }}>
                      {BUILTIN_STAMPS_HURUF.map((s) => (
                        <button key={s.id} title={s.label} onClick={() => { setStampChoiceId(s.id); setActiveTool("stamp"); }} className="aspect-square rounded border p-1 flex items-center justify-center transition-colors hover:opacity-80" style={{ borderColor: stampChoiceId === s.id ? C.gold : C.line, background: stampChoiceId === s.id ? C.goldSoft : C.panelAlt }}>
                          <MiniStampCells cells={s.cells} w={s.w} h={s.h} color={stampChoiceId === s.id ? C.gold : C.muted} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion Custom */}
                <div className="mb-3 border rounded overflow-hidden" style={{ borderColor: C.line }}>
                  <button onClick={() => setStampCats(c => ({...c, custom: !c.custom}))} className="w-full px-2 py-1.5 flex justify-between items-center text-[11px]" style={{ background: stampCats.custom ? C.panelAlt : 'transparent', color: C.text }}>
                    <span className="font-medium">Custom</span>
                    {stampCats.custom ? <ChevronDown size={12}/> : <ChevronUp size={12}/>}
                  </button>
                  {stampCats.custom && (
                    <div className="p-2" style={{ background: C.chrome }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px]" style={{ color: C.muted }}>Stempel Anda</p>
                        <button onClick={() => setShowCsvForm((s) => !s)} className="text-[10px] px-1.5 py-0.5 rounded transition-colors" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}>{showCsvForm ? "Tutup" : "+ CSV"}</button>
                      </div>
                      
                      {showCsvForm && (
                        <div className="mb-2 p-1.5 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
                          <input value={csvName} onChange={(e) => setCsvName(e.target.value)} placeholder="Nama (mis. Alif)" className="w-full text-[10px] px-1.5 py-1 rounded mb-1" style={{ background: C.chrome, border: `1px solid ${C.line}`, color: C.text }} />
                          <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder={"000;010;000"} rows={2} className="w-full text-[10px] font-mono px-1.5 py-1 rounded mb-1" style={{ background: C.chrome, border: `1px solid ${C.line}`, color: C.text }} />
                          <button onClick={handleAddCsvStamp} className="w-full text-[10px] py-1 rounded font-bold" style={{ background: C.gold, color: C.chrome }}>Tambah CSV</button>
                        </div>
                      )}

                      <div className="grid grid-cols-4 md:grid-cols-3 gap-1.5">
                        {customCsvStamps.map((s) => (
                          <button key={s.id} title={s.label} onClick={() => { setStampChoiceId(s.id); setActiveTool("stamp"); }} className="aspect-square rounded border p-1 flex items-center justify-center transition-colors hover:opacity-80" style={{ borderColor: stampChoiceId === s.id ? C.gold : C.line, background: stampChoiceId === s.id ? C.goldSoft : C.panelAlt }}>
                            <MiniStampCells cells={s.cells} w={s.w} h={s.h} color={stampChoiceId === s.id ? C.gold : C.muted} />
                          </button>
                        ))}
                        {customImageStamps.map((cs) => (
                          <button key={cs.id} title={cs.label} onClick={() => { setStampChoiceId(cs.id); setActiveTool("stamp"); }} className="aspect-square rounded border p-1 flex items-center justify-center overflow-hidden transition-colors hover:opacity-80" style={{ borderColor: stampChoiceId === cs.id ? C.gold : C.line, background: C.panelAlt }}>
                            <img src={cs.dataUrl} alt={cs.label} className="w-full h-full object-contain" />
                          </button>
                        ))}
                        <button onClick={() => stampUploadRef.current.click()} className="aspect-square rounded border border-dashed flex items-center justify-center transition-colors hover:opacity-80" style={{ borderColor: C.line, color: C.muted }} title="Unggah Gambar">
                          <Upload size={14} />
                        </button>
                        <input ref={stampUploadRef} type="file" accept="image/*" className="hidden" onChange={handleUploadStamp} />
                      </div>
                      {(customCsvStamps.length === 0 && customImageStamps.length === 0) && (
                         <p className="text-[9px] text-center mt-2 opacity-50" style={{ color: C.muted }}>Belum ada stempel custom</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Stamp Properties */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px]" style={{ color: C.muted }}>Ukuran (Sel)</span>
                    {chosenStamp.kind === "cells" && (
                      <button onClick={() => { setNextFootprintW(chosenStamp.w); setNextFootprintH(chosenStamp.h); }} className="text-[9px] px-1 py-0.5 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}>Asli ({chosenStamp.w}×{chosenStamp.h})</button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input type="number" min={1} max={MAX_STAMP} value={nextFootprintW} onChange={(e) => setNextFootprintW(Math.max(1, Math.min(MAX_STAMP, Number(e.target.value) || 1)))} className="w-12 text-[11px] px-1 py-1 rounded text-center" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                    <span className="text-xs" style={{ color: C.muted }}>×</span>
                    <input type="number" min={1} max={MAX_STAMP} value={nextFootprintH} onChange={(e) => setNextFootprintH(Math.max(1, Math.min(MAX_STAMP, Number(e.target.value) || 1)))} className="w-12 text-[11px] px-1 py-1 rounded text-center" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px]" style={{ color: C.muted }}>Rotasi</span>
                  <button onClick={() => setNextStampRotation((r) => (r + 90) % 360)} className="flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-colors" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}><RotateCw size={10} /> {nextStampRotation}°</button>
                </div>
              </Panel>

              {/* LAYER */}
              <Panel C={C} title="Layer" icon={<LayersIcon size={14} />} open={panels.layer.open} collapsed={panels.layer.collapsed} onToggleCollapse={() => togglePanelCollapsed("layer")} onClose={() => closePanel("layer")} noBorder>
                <button onClick={addLayer} className="w-full text-xs py-1.5 rounded mb-2 flex items-center justify-center gap-1 font-bold" style={{ background: C.gold, color: C.chrome }}><Plus size={13} /> Tambah Layer</button>
                <div className="flex flex-col gap-1.5">
                  {displayLayers.map((layer) => (
                    <LayerRow
                      key={layer.id} layer={layer} active={layer.id === project.activeLayerId} C={C}
                      onSelect={() => setActiveLayerId(layer.id)} onToggleVisible={() => toggleVisible(layer.id)}
                      onToggleLock={() => toggleLock(layer.id)} onRename={(name) => renameLayer(layer.id, name)}
                      onDuplicate={() => duplicateLayer(layer.id)} onDelete={() => removeLayer(layer.id)}
                      onOpacity={(v) => setOpacity(layer.id, v)} onMoveUp={() => moveLayer(layer.id, 1)}
                      onMoveDown={() => moveLayer(layer.id, -1)} onMerge={() => mergeDown(layer.id)}
                      canDelete={project.layers.length > 1}
                    />
                  ))}
                </div>
              </Panel>

              {(!panels.grid.open && !panels.color.open && !panels.stamp.open && !panels.layer.open) && (
                 <div className="px-4 py-8 text-center">
                   <p className="text-[10px]" style={{ color: C.muted }}>Semua panel ditutup.</p>
                   <p className="text-[10px] mt-1 hidden md:block" style={{ color: C.muted }}>Buka dari ikon di bar sebelah kiri.</p>
                   <button onClick={() => { openPanel("grid"); openPanel("color"); openPanel("stamp"); openPanel("layer"); }} className="mt-3 text-[10px] border px-2 py-1 rounded" style={{ borderColor: C.line, color: C.text }}>Tampilkan Semua</button>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ small components ------------------------------ */
function IconBtn({ C, children, title, onClick, disabled }) {
  return (
    <button title={title} onClick={onClick} disabled={disabled} className="p-1 md:p-1.5 rounded transition-colors" style={{ color: disabled ? C.muted : C.text, opacity: disabled ? 0.3 : 1 }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.background = C.panelAlt)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      {children}
    </button>
  );
}
function PanelToggle({ C, children, title, onClick }) {
  return (
    <button title={title} onClick={onClick} className="w-8 h-8 flex justify-center items-center rounded cursor-pointer transition-colors" style={{ color: C.muted }} onMouseEnter={(e) => (e.currentTarget.style.background = C.panelAlt)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      {children}
    </button>
  );
}
function ToolBtn({ C, children, title, active, disabled, onClick }) {
  return (
    <button title={title} onClick={onClick} disabled={disabled} className="w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center transition-colors" style={{ background: active ? C.goldSoft : "transparent", color: disabled ? C.muted : active ? C.gold : C.muted, opacity: disabled ? 0.3 : 1 }} onMouseEnter={(e) => !active && !disabled && (e.currentTarget.style.background = C.panelAlt)} onMouseLeave={(e) => !active && (e.currentTarget.style.background = "transparent")}>
      {children}
    </button>
  );
}
function Panel({ C, title, icon, open, collapsed, onToggleCollapse, onClose, children, noBorder, noCloseIcon }) {
  if (!open) return null;
  return (
    <div style={{ borderBottom: noBorder ? "none" : `1px solid ${C.line}` }}>
      <div className="flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors hover:opacity-80" onClick={onToggleCollapse} style={{ background: collapsed ? "transparent" : "rgba(0,0,0,0.2)" }}>
        <div className="flex items-center gap-1.5" style={{ color: C.muted }}>{icon}<span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold" style={{ color: C.text }}>{title}</span></div>
        <div className="flex items-center gap-0.5">
          <button onClick={(e) => { e.stopPropagation(); onToggleCollapse(); }} style={{ color: C.muted }} className="p-0.5">{collapsed ? <ChevronDown size={12} /> : <ChevronUp size={12} />}</button>
          {!noCloseIcon && <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ color: C.muted }} className="p-0.5"><X size={12} /></button>}
        </div>
      </div>
      {!collapsed && <div className="px-3 pt-2 pb-3">{children}</div>}
    </div>
  );
}
function ToggleRow({ C, label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between py-1.5 cursor-pointer hover:opacity-80 transition-opacity">
      <span className="text-[11px]" style={{ color: C.text }}>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="scale-90" />
    </label>
  );
}
function Swatch({ C, color, active, onClick }) {
  return <button onClick={onClick} className="w-5 h-5 md:w-6 md:h-6 rounded cursor-pointer transition-transform hover:scale-110" style={{ background: color, border: active ? `2px solid ${C.gold}` : `1px solid ${C.line}`, boxShadow: active ? "0 0 0 1px rgba(0,0,0,0.6)" : "none" }} />;
}
function MiniStampCells({ cells, w, h, color }) {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      {cells.map(([x, y], i) => (<rect key={i} x={x} y={y} width={1} height={1} fill={color} />))}
    </svg>
  );
}
function LayerRow({ C, layer, active, onSelect, onToggleVisible, onToggleLock, onRename, onDuplicate, onDelete, onOpacity, onMoveUp, onMoveDown, onMerge, canDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(layer.name);
  return (
    <div onClick={onSelect} className="rounded px-2 py-1.5 cursor-pointer transition-colors" style={{ background: active ? C.goldSoft : C.panelAlt, border: `1px solid ${active ? C.gold : C.line}` }}>
      <div className="flex items-center gap-1">
        <button onClick={(e) => { e.stopPropagation(); onToggleVisible(); }} style={{ color: C.muted }} className="hover:text-white">{layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}</button>
        <button onClick={(e) => { e.stopPropagation(); onToggleLock(); }} style={{ color: C.muted }} className="hover:text-white">{layer.locked ? <Lock size={12} /> : <Unlock size={12} />}</button>
        {editing ? (
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} onBlur={() => { setEditing(false); onRename(name); }} onKeyDown={(e) => e.key === "Enter" && e.target.blur()} onClick={(e) => e.stopPropagation()} className="flex-1 text-[10px] px-1 py-0.5 rounded min-w-0" style={{ background: C.chrome, border: `1px solid ${C.line}`, color: C.text }} />
        ) : (
          <span onDoubleClick={(e) => { e.stopPropagation(); setEditing(true); }} className="flex-1 text-[10px] truncate" style={{ color: C.text }}>{layer.name}</span>
        )}
        <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} style={{ color: C.muted }} className="hover:text-white"><ChevronUp size={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} style={{ color: C.muted }} className="hover:text-white"><ChevronDown size={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} style={{ color: C.muted }} className="hover:text-white"><Copy size={12} /></button>
        <button onClick={(e) => { e.stopPropagation(); onMerge(); }} style={{ color: C.muted }} className="hover:text-white"><ArrowUpDown size={12} /></button>
        {canDelete && (<button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ color: C.danger }} className="hover:opacity-70"><Trash2 size={12} /></button>)}
      </div>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-[9px]" style={{ color: C.muted }}>Opasitas</span>
        <input type="range" min={0} max={1} step={0.05} value={layer.opacity} onClick={(e) => e.stopPropagation()} onChange={(e) => onOpacity(Number(e.target.value))} className="flex-1 h-1" />
      </div>
    </div>
  );
}
