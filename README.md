# Tagbrain
<h3 align="center">
    <img alt="Logo" src="https://github.com/Tagbrain/Tagbrain/blob/main/Tagbrain_logo.png" width="400"/>
</h3>

<a href="https://tagbrain.org/project/">Site link</a>

+ Description
    The web application is designed for editing and optimizing text structures of information and representing information as hypergraphs. It provides a set of functions for quickly retrieving information from large graphs and automatically optimizing them, as well as for fast editing. The application also includes a tag classifier functionality with support for tag hierarchy. It can be used for planning complex processes. During its development, a custom syntax based on the English language, mind maps, programming languages, Telegram and Blitz functionality for working with tags was created.

Screenshots
<h3 style="display:grid;grid-template: 1fr/repeat(auto-fit,minmax(300px,1fr));">
    <img alt="transhumanism1" style="grid-column: 1/2; padding: 4px;" src="https://github.com/Tagbrain/Tagbrain/blob/main/tagbrain_L_img1.png"/>
    <img alt="transhumanism1" style="padding: 4px;" src="https://github.com/Tagbrain/Tagbrain/blob/main/tagbrain_L_img2.png"/>
</h3> 

### Terminology v 0.1

+ Basic variables 
    + <a href="">#neuron</a> is a file that contains a tree structure of words (synapses and description)
    + <a href="">#synapse</a> is a word with a hash tag that is found in the tree structure of a neuron. If different neurons have the same synapses, then they form connections between these neurons.
    + <a href="">#connection</a> is a fibers of different weigth that connect synapses with the same values. The fibers thicknesses are determined by row number, row depth (tabulation), components selective activation and weight index.
    + <a href="">#microfeature</a> is a part of the chain_of_fathers from 2 or more fathers (features).
    + <a href="">#chain_of_fathers</a> is parents hierarchy of the target synapse. It's contain a lot of microfeatures.
    + <a href="">#anemone</a>
        + One level radial structure
        + #anemone_induction00s
            + Inward direction. Contains one feeder_stream and one or more main_stream. Feeader_stream is category which is smaller than categories of main_stream.
        + #anemone_deduction00s
            + Exward direction. Contains one truncus and one or more <a href="">#outgrowths</a>. <a href="">#truncus</a> is category which is bigger than categories of outgrowths.
+ #neural_activity
    + #neural_activation
        Number index is characterized the significance of summarizing activations of target synapses. In many causes the index is 0 because the neuron has no target synapses.
    + #tangle_L_activation00s
        Chain activation of neurons by key synapses and addition synapses, which are strengthen or forgotten during the collect of the tangle of activations. 
        A target neuron can has no key synapses but it can activate by strengthening addition features of previous truly target neurons.
    + #mental_image is a combination of several tangles.

+ #components_selective_activation
    + #dendrites_outgrowth00s are dead-end superstructures over synapses that are formed with each neuron activation. 
        And they are destroyed if other neurons except the target one are activated. 
        Needed to store information about recent activations. 
        Dendrites outgrowths allow the system to dynamically adapt to the most frequent activations of recent times, increasing their significance.
    + #receptor00s of the synapses
        These are functional components of a synapse that affect on the activation of the neuron at the synapse.
        The distribution of receptors in synapses is different, which allows us to create another meta-graph of the distribution of dynamic-activations.
        Each synapse has its own combination of receptors with difference weight of activation.
        We can secrete neurotransmitters that will instantly turn off or turn on groups of synapses from the search.
            example receptors names: AA, BBB, ABA, AVF ... 
    + #neurotransmitter00s is different instanses for activation one receptor or them functional group. 
        #cluster_neurotransmission is summarizing index of the weights all receptors of the neuron. For learning tagsystem
    
+ #generalization_function
    + Description: combine several branches of outgrowths. Uses #anemone_induction00s and #anemone_deduction00s


+ Learning
    + Task: get more complete object properties when querying the graph
    + It is #neurogenesis or #synaptogenesis. 
    + The formation facultative_neuron and transfering into conservative_neurons. 
    + Changing weights of synapses.
        + #neurogenesis is formation of facultative_neuron.
        + #synaptogenesis is formation of new synapses both of type neurons. Main targets are new neurons or neurons with the most frequent activation.


    #facultative_neuron
    #сonservative_neuron
    ...

+ News
 + ✅v 1.3.0⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯11.17.2023
```
🟢 Registration is now done through three entities: Name, Password, and Email.
🟢 The search, activation graph, and RAM have been changed and combined into one type of interface unit.
🟢 The main testing channel has been increased to 11,000 neurons, which caused performance problems with the graph activation function. This issue will be fixed in the next updates.
🟢 The mobile version has been improved.
🟢 The interfaces of pop-up windows have been improved.
🟢 Read mode is completed now.
🟢 The stability of tabs, channels features has been increased.
🟢 Many others bugs have been fixed.
```


