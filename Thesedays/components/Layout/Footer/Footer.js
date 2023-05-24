import React from 'react'
import {Button} from 'react-native'
import {Li} from 'react-native'

const Footer = () => {
    return (
        <div className="footer">
            <ul>
                <Li> {/* Corrected: Capitalized component name */}
                    <button
                        style={{ width: '25%', backgroundColor: '#f194ff' }}
                        onClick={() => alert('Button1 pressed')}
                    >
                        Button1
                    </button>
                </Li> {/* Corrected: Capitalized component name */}
                <Li> {/* Corrected: Capitalized component name */}
                    <button
                        style={{ width: '25%', backgroundColor: '#f194ff' }}
                        onClick={() => alert('Button2 pressed')}
                    >
                        Button2
                    </button>
                </Li> {/* Corrected: Capitalized component name */}
                <Li> {/* Corrected: Capitalized component name */}
                    <button
                        style={{ width: '25%', backgroundColor: '#f194ff' }}
                        onClick={() => alert('Button3 pressed')}
                    >
                        Button3
                    </button>
                </Li> {/* Corrected: Capitalized component name */}
                <Li> {/* Corrected: Capitalized component name */}
                    <button
                        style={{ width: '25%', backgroundColor: '#f194ff' }}
                        onClick={() => alert('Button4 pressed')}
                    >
                        Button4
                    </button>
                </Li> {/* Corrected: Capitalized component name */}
            </ul>
        </div>
    )
}

export default Footer
